import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { LocalStrategy } from "./strategies/local-strategy";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { JwtStrategy } from "./strategies/jwt-strategy";
import { RefreshJwtStrategy } from "./strategies/refreshToken.strategy";
import { UserModule } from "../user/user.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync(
      {
        useFactory: async () => ({
          secret: `${process.env.jwt_secret}`,
          signOptions: { expiresIn: "15m" }
        })
      }),
    UserModule
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    RefreshJwtStrategy
  ],
  controllers: [AuthController]
})
export class AuthModule {
}
