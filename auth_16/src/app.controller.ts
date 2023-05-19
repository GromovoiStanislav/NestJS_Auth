import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";

@Controller()
export class AppController {

  @UseGuards(AuthGuard("bearer"))
  @Get()
  getHello(@Req() request: Request) {

    return {
      data: `Hello ${request.user.username}!`,
      user: request.user
    };
  }
}
