import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { LocalAuthGuard } from "./auth/local-auth.guard";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { AuthService } from "./auth/auth.service";

@Controller()
export class AppController {

  constructor(private authService: AuthService) {
  }

  // @UseGuards(AuthGuard('local'))
  @UseGuards(LocalAuthGuard)
  @Post("login")
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  // @UseGuards(AuthGuard('jwt'))
  @UseGuards(JwtAuthGuard)
  @Get("protected")
  protected(@Request() req) {
    return { user: req.user };
  }

}