import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth/services/auth.service";
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";
import { LocalAuthGuard } from "./auth/guards/local-auth.guard";

@Controller()
export class AppController {

  constructor(
    private readonly authService: AuthService
  ) {
  }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("protected")
  getHello(@Request() req) {
    return {
      message: `This route is protected, but the user ${req.user.name} has access`,
      user: req.user
    };
  }

}
