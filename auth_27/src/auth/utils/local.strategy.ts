import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthenticationProvider } from "../services/auth/auth";




@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthenticationProvider,
  ) {
    super({
      usernameField: 'email'
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user; // -> Request.user
  }
}