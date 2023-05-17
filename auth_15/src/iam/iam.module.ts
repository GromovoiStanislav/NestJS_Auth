import { Module } from "@nestjs/common";
import { BcryptService } from "./hashing/bcrypt.service";
import { HashingService } from "./hashing/hashing.service";
import { AuthenticationController } from "./authentication/authentication.controller";
import { AuthenticationService } from "./authentication/authentication.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/entities/user.entity";
import { JwtModule } from "@nestjs/jwt";
import jwtConfig from "./config/jwt.config";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { AuthenticationGuard } from "./authentication/guards/authentication.guard";
import { AccessTokenGuard } from "./authentication/guards/access-token.guard";
import { RefreshTokenIdsStorage } from "./authentication/refresh-token-ids.storage";
import { RolesGuard } from "./authorization/guards/roles.guard";
import { PermissionsGuard } from "./authorization/guards/permissions.guard";
import { PolicyHandlerStorage } from "./authorization/policies/policy-handlers.storage";
import { FrameworkContributorPolicyHandler } from "./authorization/policies/framework-contributor.policy";
import { PoliciesGuard } from "./authorization/guards/policies.guard";
import { ApiKey } from "../users/api-keys/entities/api-key.entity";
import { ApiKeyGuard } from "./authentication/guards/api-key.guard";
import { ApiKeysService } from "./authentication/api-keys.service";
import { GoogleAuthenticationService } from './authentication/social/google-authentication.service';
import { GoogleAuthenticationController } from './authentication/social/google-authentication.controller';
import { OtpAuthenticationService } from './authentication/otp-authentication.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, ApiKey]),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider())
  ],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService
    },
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard
    },// globally !!!
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    },// globally !!!
    // NOTE: or role or permissions !!!
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard
    },// globally !!!
    {
      provide: APP_GUARD,
      useClass: PoliciesGuard
    },// globally !!!
    AccessTokenGuard,
    ApiKeyGuard,
    RefreshTokenIdsStorage,
    AuthenticationService,
    ApiKeysService,
    PolicyHandlerStorage,
    FrameworkContributorPolicyHandler,
    GoogleAuthenticationService,
    OtpAuthenticationService
  ],
  controllers: [AuthenticationController, GoogleAuthenticationController]
})
export class IamModule {
}
