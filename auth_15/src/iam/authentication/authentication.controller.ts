import { Body, Controller, HttpCode, HttpStatus, Post, Res } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import { SignUpDto } from "./dto/sign-up.dto";
import { SignInDto } from "./dto/sign-in.dto";
import { Response } from "express";
import { Auth } from "./decorators/auth.decorator";
import { AuthType } from "./enums/auth-type.enum";
import { RefreshTokenDto } from "./dto/refresh-token.dto";
import { ActiveUser } from "../decorators/active-user.decorator";
import { ActiveUserData } from "../interfaces/active-user-data.interface";
import { OtpAuthenticationService } from "./otp-authentication.service";
import { toFileStream } from "qrcode";


@Auth(AuthType.None)
@Controller("auth")
export class AuthenticationController {

  constructor(
    private authService: AuthenticationService,
    private otpAuthService: OtpAuthenticationService
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

  @Auth(AuthType.Bearer)
  @HttpCode(HttpStatus.OK)
  @Post("2fa/generate")
  async generateQrCode(
    @ActiveUser() user: ActiveUserData,
    @Res() response: Response
  ) {
    const { secret, uri } = this.otpAuthService.generateSecret(user.email);
    await this.otpAuthService.enableTfaForUser(user.email, secret);
    response.type("png");
    return toFileStream(response, uri);
  }

}
