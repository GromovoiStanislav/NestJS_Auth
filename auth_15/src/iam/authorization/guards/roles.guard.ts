import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "../../../users/enums/role.enum";
import { REQUEST_USER_KEY, ROLES_KEY } from "../../iam.constants";
import { ActiveUserData } from "../../interfaces/active-user-data.interface";

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(
    private reflector: Reflector
  ) {
  }

  canActivate(context: ExecutionContext): boolean {
    const contextRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if (!contextRoles) {
      return true;
    }

    const user: ActiveUserData = context.switchToHttp().getRequest()[REQUEST_USER_KEY];

    return contextRoles.some((role) => user.role === role);
  }

}