import { SetMetadata } from '@nestjs/common';
import { UserPermission } from './user-permissin.enum';

export const PERMISSIONS_KEY = 'permissions';
export const RequirePermissions = (...permissions: UserPermission[]) => SetMetadata(PERMISSIONS_KEY, permissions);