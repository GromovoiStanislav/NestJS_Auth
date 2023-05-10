import { Role } from './role.enum';
import { UserPermission } from './user-permissin.enum';

export class User {
	name: string;
	roles: Role[];
	permissions: UserPermission[]
}