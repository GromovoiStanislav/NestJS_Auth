import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";


@Injectable()
export class PermissionsGuard implements CanActivate {

  constructor(
    private reflector: Reflector
  ) {
  }

  canActivate(context: ExecutionContext): boolean {
    const [reg] = context.getArgs();
    const userPermissions = reg?.user?.permissions || [];
    const requiredPermissions = this.reflector.get("permissions", context.getHandler()) || [];
    const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));

    if (requiredPermissions.length===0 || hasAllPermissions) {
      return true;
    }

    throw new ForbiddenException("Insufficient permissions")
  }

}
