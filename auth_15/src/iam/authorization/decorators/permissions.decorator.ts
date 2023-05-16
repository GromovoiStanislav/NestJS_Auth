import { SetMetadata } from '@nestjs/common';
import { PERMISSIONS_KEY } from "../../iam.constants";
import { PermissionType } from "../permission.type";

export const Permissions = (...permissions: PermissionType[]) => SetMetadata(PERMISSIONS_KEY, permissions);