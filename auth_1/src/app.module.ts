import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(`mongodb://${process.env.DATABASE_HOST}/nestauth`),
    UserModule,
    AuthModule
  ]
})
export class AppModule {
}
