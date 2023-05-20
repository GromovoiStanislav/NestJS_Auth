import { Controller, Get } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";

@Controller()
export class AppController {

  @ApiResponse({ status: 200, description: "Get Hello" })
  @Get()
  getHello(): string {
    return "Hello NestJS";
  }

}
