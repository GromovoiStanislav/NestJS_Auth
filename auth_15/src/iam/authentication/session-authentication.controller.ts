import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from "@nestjs/common";
import { Auth } from "./decorators/auth.decorator";
import { AuthType } from "./enums/auth-type.enum";
import { SessionAuthenticationService } from "./session-authentication.service";
import { Request } from "express";
import { SignInDto } from "./dto/sign-in.dto";
import { promisify } from "node:util";
import { SessionGuard } from "./guards/session.guard";
import { ActiveUser } from "../decorators/active-user.decorator";
import { ActiveUserData } from "../interfaces/active-user-data.interface";


@Auth(AuthType.None)
@Controller("auth/session")
export class SessionAuthenticationController {

  constructor(
    private readonly sessionAuthService: SessionAuthenticationService
  ) {
  }

  @HttpCode(HttpStatus.OK)
  @Post("sign-in")
  async signIn(
    @Req() request: Request,
    @Body() signInDto: SignInDto) {
    const user = await this.sessionAuthService.signIn(signInDto);
    await promisify(request.logIn).call(request, user);

  }


  @UseGuards(SessionGuard)
  @Get("hello")
  async sayHello(@ActiveUser() user: ActiveUserData) {
    return { data: `Hello ${user.email}` };
  }
}