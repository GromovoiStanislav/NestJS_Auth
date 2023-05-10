import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { RolesGuard } from "./roles.guard";
import { APP_GUARD } from "@nestjs/core";
import { PermissionsGuard } from "./permissions.guard";

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    },
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard
    }
  ],
  controllers: [UsersController]
})
export class UsersModule {
}