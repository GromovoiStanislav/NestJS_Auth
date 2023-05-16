import { SetMetadata } from '@nestjs/common';
import { Role } from "../../../users/enums/role.enum";
import { ROLES_KEY } from "../../iam.constants";

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);