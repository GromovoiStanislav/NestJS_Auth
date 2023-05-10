import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Role } from './role.enum';
import { User } from './user.entity';
import { UserPermission } from './user-permissin.enum';

@Injectable()
export class RolesGuard implements CanActivate {
	
	constructor(private reflector: Reflector) { }

	canActivate(context: ExecutionContext): boolean {
		
		const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass(),
		]);

		if (!requiredRoles) {
			return true;
		}

		// const { user } = context.switchToHttp().getRequest();
		const user: User = {
			name: 'Mark',
			roles: [Role.ADMIN],
			permissions: [UserPermission.CREATE_USER, UserPermission.READ_USER, UserPermission.REMOVE_USER, UserPermission.UPDATE_USER]
		}

		return requiredRoles.some((role) => user.roles?.includes(role));
	}
}