import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "../config/config.service";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {

  constructor(
    private config: ConfigService,
    private jwtService: JwtService,
    private usersService: UsersService
  ) {
  }


  async validateToken(token: string): Promise<any> {
    // validate Token....
    try {
      const payload = await this.jwtService.verifyAsync(token, {
          secret: this.config.get("SECRET")
        }
      );

      return {
        username: payload.username,
        userId: payload.sub
      };

    } catch {
      return false;
    }
  }


  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (!user || user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = {
      username: user.username,
      sub: user.userId
    };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: this.config.get("SECRET"),
        expiresIn: "15m"
      })
    };
  }


}