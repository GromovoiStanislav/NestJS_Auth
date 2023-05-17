import { Entity, Column, PrimaryGeneratedColumn, JoinTable, OneToMany } from "typeorm";
import { Role } from "../enums/role.enum";
import { Permission, PermissionType } from "../../iam/authorization/permission.type";
import { ApiKey } from "../api-keys/entities/api-key.entity";


@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  // NOTE: or role or permissions
  @Column({ enum: Role, default: Role.Regular })
  role: Role;

  // NOTE: or role or permissions
  @Column({ enum: Permission, default: [], type: "json" })
  permissions: PermissionType[];

  @JoinTable()
  @OneToMany((type) => ApiKey, (apiKey) => apiKey.user)
  apiKeys: ApiKey[];

  @Column({ nullable: true })
  googleId: string;

  @Column({ default: false })
  isTfaEnabled: boolean;

  @Column({ nullable: true })
  tfaSecret: string;

}