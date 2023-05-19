import { Strategy } from "passport-http-bearer";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";


@Injectable()
export class HttpStrategy extends PassportStrategy(Strategy) {

  constructor(private authService: AuthService) {
    super();
  }

  async validate(
    token: string,
    done: (error: UnauthorizedException, value: boolean | string) => any
  ) {

    try {
      return await this.authService.validateToken(token);
    } catch (error) {
      done(error, "The token is not valid");
    }

  }
}