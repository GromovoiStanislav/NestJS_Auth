import { Controller, Get } from "@nestjs/common";
import { GetUserId, OnlyAdmin } from "../auth/decorators";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {

  constructor(
    private userService: UserService) {
  }

  @OnlyAdmin()
  @Get("all")
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get("me")
  async getMe(@GetUserId() userId: number) {
    return this.userService.getMe(userId);
  }
}
