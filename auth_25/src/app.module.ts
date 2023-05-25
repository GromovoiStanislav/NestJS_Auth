import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AbilityModule } from './ability/ability.module';
import { APP_FILTER, APP_GUARD } from "@nestjs/core";
import { AllExceptionsFilter } from "./all-exceptions.filter";
import { AbilitiesGuard } from "./ability/abilities.guard";

@Module({
  imports: [UserModule, AbilityModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },// Global
    {
      provide: APP_GUARD,
      useClass: AbilitiesGuard,
    },// Global
    AppService
  ],
})
export class AppModule {}
