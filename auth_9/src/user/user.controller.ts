import {
  Body,
  Controller,
  Get,
  Param,
  Post, Request,
  UseGuards
} from "@nestjs/common";
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { CommentService } from '../comment/comment.service';
import { CreateUserDto } from './dto/createUserDto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

  constructor(
    private readonly userService: UserService,
    private readonly commentService: CommentService,
  ) {}

  @UseGuards(JwtGuard)
  @Get('comments')
  getUserComment(@Request() req) {
    return this.commentService.findUserComments(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }


}
