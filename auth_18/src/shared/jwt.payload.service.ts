import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "../auth/interfaces/jwt-payload.interface";
import { EXPIRES_IN } from "./constants";

@Injectable()
export class JwtPayloadService {

  constructor(
    private readonly jwtService: JwtService
  ) {
  }

  async createJwtPayload(user) {
    const data: JwtPayload = {
      email: user.email
    };

    let jwt;
    try {
      jwt = await this.jwtService.signAsync(data);
    } catch (error) {
      throw new HttpException("Internal Server error", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return {
      expiresIn: EXPIRES_IN,
      token: jwt
    };
  }
}
