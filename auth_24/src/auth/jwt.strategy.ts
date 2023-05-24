import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "./jwt-payload.interface";
import { User } from "./user.entity";
import { UsersService } from "./users.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(
    private usersService: UsersService,
    private configService: ConfigService
  ) {
    super({
      secretOrKey: configService.get("JWT_SECRET"),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;
    const user: User = await this.usersService.findByName(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
