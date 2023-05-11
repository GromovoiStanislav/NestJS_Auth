import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { CommentModule } from "./comment/comment.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";

import config from "./ormconfig";
import { ConfigModule } from "@nestjs/config";


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(config),
    UserModule,
    CommentModule,
    AuthModule
  ]
})
export class AppModule {
}
