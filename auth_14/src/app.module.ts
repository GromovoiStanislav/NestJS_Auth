import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { ProfileModule } from "./profile/profile.module";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: "postgres",
        url: configService.get('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: true
      })
    }),
    UserModule,
    AuthModule,
    ProfileModule
  ]
})
export class AppModule {
}
