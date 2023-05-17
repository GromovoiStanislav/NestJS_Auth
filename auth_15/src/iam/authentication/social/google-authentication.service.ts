import { ConflictException, Injectable, OnModuleInit, UnauthorizedException } from "@nestjs/common";
import { OAuth2Client } from "google-auth-library";
import { AuthenticationService } from "../authentication.service";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../../users/entities/user.entity";
import { Repository } from "typeorm";
import e from "express";

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {

  private oauthClient: OAuth2Client;

  constructor(
    private readonly authService: AuthenticationService,
    private readonly configService: ConfigService,
    @InjectRepository(User) private usersRepository: Repository<User>
  ) {
  }

  onModuleInit() {
    const clientID = this.configService.get("GOOGLE_CLIENT_ID");
    const clientSecret = this.configService.get("GOOGLE_CLIENT_SECRET");
    this.oauthClient = new OAuth2Client(clientID, clientSecret);
  }

  async authenticate(token: string) {
    try {
      const loginTiket = await this.oauthClient.verifyIdToken({ idToken: token });
      const { email, sub: googleId } = loginTiket.getPayload();
      const user = await this.usersRepository.findOneBy({ googleId });
      if (user) {
        return this.authService.generateTokens(user);
      } else {
        const newUser = await this.usersRepository.save({ email, googleId });
        return this.authService.generateTokens(newUser);
      }
    } catch (err) {
      if (err.code === "23505") {
        throw new ConflictException();
      }
      throw new UnauthorizedException();
    }
  }

}
