import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/typeorm";
import { AuthController } from "./controllers/auth/auth.controller";
import { AuthService } from "./services/auth/auth.service";
import { SessionSerializer } from "./utils/Serializer";
import { LocalStrategy } from "./utils/local.strategy";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [
    LocalStrategy,
    SessionSerializer,
    {
      provide: "AUTH_SERVICE",
      useClass: AuthService
    }
  ],
  exports: [
    {
      provide: "AUTH_SERVICE",
      useClass: AuthService
    }
  ]
})
export class AuthModule {
}
