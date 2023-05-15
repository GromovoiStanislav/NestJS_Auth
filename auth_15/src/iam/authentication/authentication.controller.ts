import { Body, Controller, HttpCode, HttpStatus, Post, Res } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import { SignUpDto } from "./dto/sign-up.dto";
import { SignInDto } from "./dto/sign-in.dto";
import { Response } from "express";
import { Auth } from "./decorators/auth.decorator";
import { AuthType } from "./enums/auth-type.enum";

@Auth(AuthType.None)
@Controller("auth")
export class AuthenticationController {

  constructor(
    private authService: AuthenticationService
  ) {
  }

  @Post("sign-up")
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post("sign-in")
  async signIn(
    @Res({ passthrough: true }) response: Response,
    @Body() signInDto: SignInDto) {
    const accessToken = await this.authService.signIn(signInDto);
    response.cookie("accessToken", accessToken, {
      //secure: true,
      httpOnly: true,
      sameSite: true
    });
    return { accessToken };
  }
}
