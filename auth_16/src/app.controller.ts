import { Controller, Get, Req, SetMetadata, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { PermissionsGuard } from "./auth/permissions.guard";

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


  @UseGuards(AuthGuard("bearer"), PermissionsGuard)
  @SetMetadata("permissions", ["read:cats"])
  @Get("/cats")
  getCats() {
    return "Cats...";
  }


}
