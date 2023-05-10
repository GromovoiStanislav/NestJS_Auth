import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "./auth/guards/jwt-guard.guard";
import { GetCurrentUser } from "./auth/decorators/get-user.decorator";

@Controller()
export class AppController {

  @UseGuards(JwtAuthGuard)
  @Get()
  getHello(@GetCurrentUser() user: any) {
    return { hello: user };
  }

}
