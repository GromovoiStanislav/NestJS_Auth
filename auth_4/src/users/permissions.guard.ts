import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { PERMISSIONS_KEY } from "./require-permissions.decorator";
import { UserPermission } from "./user-permissin.enum";
import { User } from "./user.entity";
import { Role } from "./role.enum";

@Injectable()
export class PermissionsGuard implements CanActivate {

  constructor(private reflector: Reflector) {
  }

  canActivate(context: ExecutionContext): boolean {

    const requiredPermissions = this.reflector.getAllAndOverride<UserPermission[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if (!requiredPermissions) {
      return true;
    }

    // const { user } = context.switchToHttp().getRequest();
    const user: User = {
      name: "Mark",
      roles: [Role.ADMIN],
      permissions: [UserPermission.CREATE_USER, UserPermission.READ_USER, UserPermission.REMOVE_USER, UserPermission.UPDATE_USER]
    };

    return requiredPermissions.some((permission) => user.permissions?.includes(permission)); // TODO
  }
}