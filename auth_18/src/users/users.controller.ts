import {
  Controller,

  Body,
  Get,
  Delete,
  Param,
  UseGuards,
  Put
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./user.interface";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags, ApiResponse } from "@nestjs/swagger";
import { UpdateUserDto } from "./dto/update-user.dto";


@ApiTags("users")
@Controller("users")
export class UsersController {

  constructor(
    private readonly usersService: UsersService
  ) {
  }


  @ApiResponse({ status: 200, description: "Successfully authenticated user" })
  @ApiResponse({ status: 401, description: "Unauthorized access" })
  @Get("authstate")
  @UseGuards(AuthGuard("jwt"))
  testAuthRoute() {
    return "authenticated";
  }


  @ApiResponse({ status: 200, description: "Fetched all users" })
  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }


  @ApiResponse({ status: 200, description: "Fetched specific user" })
  @Get("email/:email")
  async getUserByEmail(@Param("email") email: string): Promise<User> {
    return this.usersService.findOneByEmail(email);
  }


  @ApiResponse({ status: 200, description: "Fetched specific user" })
  @Get(":id")
  async getUserById(@Param("id") id: string): Promise<User> {
    return this.usersService.findOneById(id);
  }


  @ApiResponse({ status: 200, description: "Deleted all users" })
  @Delete()
  async deleteAllUsers() {
    return this.usersService.deleteAll();
  }


  @ApiResponse({ status: 200, description: "Deleted specific user" })
  @Delete(":id")
  async deleteUserById(@Param("id") id: string) {
    return this.usersService.deleteUserById(id);
  }


  @ApiResponse({ status: 200, description: "Fetched all users" })
  @ApiResponse({ status: 400, description: "User not found" })
  @Put(":id")
  async updateUser(@Param("id") id: string, @Body() user: UpdateUserDto) {
    return this.usersService.update(id, user);
  }

}
