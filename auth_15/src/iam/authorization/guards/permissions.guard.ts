import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { PERMISSIONS_KEY, REQUEST_USER_KEY } from "../../iam.constants";
import { ActiveUserData } from "../../interfaces/active-user-data.interface";
import { PermissionType } from "../permission.type";

@Injectable()
export class PermissionsGuard implements CanActivate {

  constructor(
    private reflector: Reflector
  ) {
  }

  canActivate(context: ExecutionContext): boolean {
    const contextPermissions = this.reflector.getAllAndOverride<PermissionType[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if (!contextPermissions) {
      return true;
    }

    const user: ActiveUserData = context.switchToHttp().getRequest()[REQUEST_USER_KEY];

    return contextPermissions.every((permission) => user.permissions?.includes(permission));
  }

}