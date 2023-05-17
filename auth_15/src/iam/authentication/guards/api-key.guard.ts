import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { ApiKeysService } from "../api-keys.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ApiKey } from "../../../users/api-keys/entities/api-key.entity";
import { ActiveUserData } from "../../interfaces/active-user-data.interface";
import { REQUEST_USER_KEY } from "../../iam.constants";

@Injectable()
export class ApiKeyGuard implements CanActivate {

  constructor(
    private readonly apiKeysService: ApiKeysService,
    @InjectRepository(ApiKey) private apiKeysRepository: Repository<ApiKey>
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = this.extractKeyFromHeader(request);

    if (!apiKey) {
      throw new UnauthorizedException();
    }

    const apiKeyEntityId = this.apiKeysService.extractIdFromApiKey(apiKey);
    try {
      const apiKeyEntity = await this.apiKeysRepository.findOneOrFail({
        where: { uuid: apiKeyEntityId },
        relations: { user: true }
      });
      await this.apiKeysService.validate(apiKey, apiKeyEntity.key);

      request[REQUEST_USER_KEY] = {
        sub: apiKeyEntity.user.id,
        email: apiKeyEntity.user.email,
        role: apiKeyEntity.user.role,
        permissions: apiKeyEntity.user.permissions
      } as ActiveUserData;

    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractKeyFromHeader(request: Request): string | undefined {
    const [type, key] = request.headers.authorization?.split(" ") ?? [];
    return type === "ApiKey" ? key : undefined;
  }

}