import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersModule } from "../users/users.module";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./local.strategy";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";
import { log } from "util";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    // JwtModule.register({
    //   secret: 'SECRET',
    //   signOptions: { expiresIn: "15m" }
    // }),
    JwtModule.registerAsync({
      useFactory: async () => (
        {
        secretOrPrivateKey: process.env.JWT_SECRET_KEY,
        signOptions: {
          expiresIn: process.env.JWT_EXPIRATION_TIME
        }
      })
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {
}
