import { Body, Controller, HttpCode, HttpStatus, Post, Res } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import { SignUpDto } from "./dto/sign-up.dto";
import { SignInDto } from "./dto/sign-in.dto";
import { Response } from "express";
import { Auth } from "./decorators/auth.decorator";
import { AuthType } from "./enums/auth-type.enum";
import { RefreshTokenDto } from "./dto/refresh-token.dto";

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
    const tokens = await this.authService.signIn(signInDto);
    response.cookie("accessToken", tokens.accessToken, {
      //secure: true,
      httpOnly: true,
      sameSite: true
    });
    response.cookie("refreshToken", tokens.refreshToken, {
      //secure: true,
      httpOnly: true,
      sameSite: true
    });
    return tokens;
  }



  @HttpCode(HttpStatus.OK)
  @Post("refresh-tokens")
  async refreshToken(
    @Res({ passthrough: true }) response: Response,
    @Body() refreshTokenDto: RefreshTokenDto) {
    const tokens = await this.authService.refreshToken(refreshTokenDto);
    response.cookie("accessToken", tokens.accessToken, {
      //secure: true,
      httpOnly: true,
      sameSite: true
    });
    response.cookie("refreshToken", tokens.refreshToken, {
      //secure: true,
      httpOnly: true,
      sameSite: true
    });
    return tokens;
  }

}
