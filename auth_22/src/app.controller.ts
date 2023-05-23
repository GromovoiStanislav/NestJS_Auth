import { Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Response, Request } from "express";
import { AuthService } from "./auth/auth.service";


@Controller()
export class AppController {

  constructor(
    private authService: AuthService) {
  }

  @UseGuards(AuthGuard("local"))
  @Post("auth/login")
  async login(@Req() req) {
    return this.authService.login(req.user);
  }


  @UseGuards(AuthGuard("google"))
  @Get("google")
  async google(@Req() req) {
    return "Google";
  }


  @Get("auth/google/callback")
  @UseGuards(AuthGuard("google"))
  async callback(@Req() req: Request, @Res() res: Response) {
    console.log(req.user);
    return "Home";
    // res.redirect('/profile', )
  }


}