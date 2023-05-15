import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { LocalStrategy } from "./local.strategy";

@Module({
  controllers: [AuthController],
  imports: [
    // UserModule,
    PassportModule, JwtModule],
  providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule {
}
