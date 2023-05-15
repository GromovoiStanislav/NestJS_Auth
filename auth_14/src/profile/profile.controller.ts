import { Controller, Get, UseGuards, Request } from "@nestjs/common";
// import { AuthGuard } from "@nestjs/passport";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("profile")
export class ProfileController {

  // @UseGuards(AuthGuard("jwt"))
  @UseGuards(JwtAuthGuard)
  @Get()
  profile(@Request() req) {
    return { user: req.user };
  }

}
