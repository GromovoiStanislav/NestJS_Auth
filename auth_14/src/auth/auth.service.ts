import { Injectable, OnModuleInit } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import { ConfigService } from "@nestjs/config";
import { ModuleRef } from "@nestjs/core";

@Injectable()
export class AuthService implements OnModuleInit {

  private userService: UserService

  constructor(
    private moduleRef: ModuleRef,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {
  }

  onModuleInit() {
    this.userService = this.moduleRef.get(UserService,{strict:false})
  }


  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: "15m"
      })
    };
  }


}
