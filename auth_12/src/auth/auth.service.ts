import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../users/users.service";
import { User } from "../users/entities/user.entity";
import RefreshToken from "./entities/refresh-token.entity";
import { sign, verify } from "jsonwebtoken";
import { Auth, google } from "googleapis";


@Injectable()
export class AuthService {

  private refreshTokens: RefreshToken[] = [];
  private oauthClient: Auth.OAuth2Client;

  constructor(
    private readonly userService: UserService
  ) {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    this.oauthClient = new google.auth.OAuth2(clientId, clientSecret);
  }

  async loginGoogleUser(
    token: string,
    values: { userAgent: string; ipAddress: string }
  ): Promise<{ accessToken: string; refreshToken: string } | undefined> {
    try {
      const tokenInfo = await this.oauthClient.getTokenInfo(token);
      const user = await this.userService.findByEmail(tokenInfo.email);
      if (user) {
        return this.newRefreshAndAccessToken(user, values);
      }
      return undefined

    } catch (e) {
      return undefined
    }
  }


  async login(
    email: string,
    password: string,
    values: { userAgent: string; ipAddress: string }
  ): Promise<{ accessToken: string; refreshToken: string } | undefined> {

    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }
    // verify your user -- use argon2 for password hashing!!
    if (user.password !== password) {
      throw new UnauthorizedException();
    }

    return this.newRefreshAndAccessToken(user, values);
  }


  private async newRefreshAndAccessToken(
    user: User,
    values: { userAgent: string; ipAddress: string }
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const refreshObject = new RefreshToken({
      id:
        this.refreshTokens.length === 0
          ? 0
          : this.refreshTokens[this.refreshTokens.length - 1].id + 1,
      //...values,
      userId: user.id
    });
    this.refreshTokens.push(refreshObject);

    return {
      accessToken: sign(
        {
          userId: user.id,
          ...values
        },
        process.env.ACCESS_SECRET,
        {
          expiresIn: "1h"
        }
      ),
      refreshToken: refreshObject.sign()
    };
  }


  async logout(refreshStr): Promise<void> {
    const refreshToken = await this.retrieveRefreshToken(refreshStr);

    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    // delete refreshtoken from db
    this.refreshTokens = this.refreshTokens.filter(
      (refreshToken) => refreshToken.id !== refreshToken.id
    );
  }

  async refresh(
    refreshStr: string,
    values: { userAgent: string; ipAddress: string }
  ): Promise<{ accessToken: string } | undefined> {
    const refreshToken = await this.retrieveRefreshToken(refreshStr);
    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    const user = await this.userService.findOne(refreshToken.userId);
    if (!user) {
      return undefined;
    }

    const accessToken = {
      userId: refreshToken.userId,
      ...values
    };

    return {
      accessToken: sign(accessToken, process.env.ACCESS_SECRET, { expiresIn: "1h" })
    };
  }


  private async retrieveRefreshToken(
    refreshStr: string
  ): Promise<RefreshToken | undefined> {
    try {
      const decoded = verify(refreshStr, process.env.REFRESH_SECRET);
      if (typeof decoded === "string") {
        return undefined;
      }
      return this.refreshTokens.find((token) => token.id === decoded.id);

    } catch (e) {
      return undefined;
    }
  }


}
