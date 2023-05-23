import {  Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { redisStore } from "cache-manager-redis-store";
import { CacheModule } from '@nestjs/cache-manager';
import { RedisClientOptions } from "redis";
import { AuthModule } from "./auth/auth.module";
import { AdminGuard, SessionGuard } from "./auth/guards";
import { PrismaModule } from "./prisma/prisma.module";
import { UserModule } from "./user/user.module";
import { ExpenseModule } from "./expense/expense.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SchedulerModule } from "./scheduler/scheduler.module";
import { ScheduleModule } from "@nestjs/schedule";
import { AppController } from "./app.controller";


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    SchedulerModule,
    PrismaModule,
    AuthModule,
    UserModule,
    ExpenseModule,
    ScheduleModule.forRoot(),
    CacheModule.registerAsync<RedisClientOptions>({
      isGlobal: true,
      //imports: [ConfigModule],
      inject: [ConfigService],
      // @ts-ignore
      useFactory: (config: ConfigService) => {
        return {
          store: redisStore,
          url: config.getOrThrow("REDIS_URL"),
        };
      }
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: SessionGuard
    },
    {
      provide: APP_GUARD,
      useClass: AdminGuard
    }
  ],
  controllers: [AppController]
})
export class AppModule {
}
