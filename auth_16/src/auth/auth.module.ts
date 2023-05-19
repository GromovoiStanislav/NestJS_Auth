import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { HttpStrategy } from "./http.strategy";
import { ConfigModule } from "../config/config.module";
import { UsersModule } from "../users/users.module";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";


@Module({
  imports: [ConfigModule, UsersModule, JwtModule],
  providers: [AuthService, HttpStrategy],
  controllers: [AuthController]
})
export class AuthModule {
}