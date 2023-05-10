import { Controller, Get, Post, Request, Session, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { LocalAuthGuard } from "./auth/local-auth.guard";
import { AuthenticatedGuard } from "./auth/authenticated.guard";

@Controller()
export class AppController {

  // @UseGuards(AuthGuard('local'))
  @UseGuards(LocalAuthGuard)
  @Post("login")
  login(@Request() req) {
    return { msg: "Logged in!", user: req.user };
  }


  @UseGuards(AuthenticatedGuard)
  @Get("protected")
  protected(@Request() req) {
    return { user: req.user };
  }

  @Get('visits')
  // visits(@Request() req) {
  //   req.session.visits = req.session.visits ? req.session.visits + 1 : 1;
  //   return req.session
  // }
  visits(@Session() session: Record<string, any>) {
    session.visits = session.visits ? session.visits + 1 : 1;
    return session

  }


}