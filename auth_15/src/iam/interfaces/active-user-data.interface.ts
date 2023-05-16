import { Role } from "../../users/enums/role.enum";
import { PermissionType } from "../authorization/permission.type";

export interface ActiveUserData {
  /**
   * user's ID
   */
  sub: number;

  /**
   * user's email
   */
  email: string;

  /**
   * user's role
   * NOTE: or role or permissions
   */
  role: Role;

  /**
   * user's permissions
   * NOTE: or role or permissions
   */
  permissions: PermissionType[];
}