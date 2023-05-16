import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../enums/role.enum";
import { Permission, PermissionType } from "../../iam/authorization/permission.type";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  // NOTE: or role or permissions
  @Column({ enum: Role, default: Role.Regular })
  role: Role;

  // NOTE: or role or permissions
  @Column({ enum: Permission, default: [], type: "json" })
  permissions: PermissionType[];

}