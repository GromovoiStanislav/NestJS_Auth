import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthDto } from "./dto";

import * as users from "../users.json"; // tsconfig.json -> "resolveJsonModule": true

@Injectable()
export class AuthService {

  constructor(
    private jwtService: JwtService
  ) {
  }

  async signinLocal(dto: AuthDto) {
    const user = users.find((user) => user.email === dto.email);

    if (!user) {
      throw new UnauthorizedException("Credentials incorrect");
    }
    if (user.password !== dto.password) {
      throw new UnauthorizedException("Credentials incorrect");
    }

    const access_token = await this.signUser(user.id, user.email, "user");
    return { access_token };
  }

  async signUser(userId: number, email: string, type: string) {
    return this.jwtService.sign({
      sub: userId,
      email,
      type: type
    });
  }
}
