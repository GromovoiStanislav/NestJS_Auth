import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { CommentModule } from "../comment/comment.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    CommentModule
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {
}
