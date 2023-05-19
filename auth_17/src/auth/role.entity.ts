import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

export enum ERole {
  User = 'user',
  Admin = 'admin',
  Moderator = 'moderator',
}

@Entity("roles")
export class Role {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: "enum",
    enum: ERole
  })
  name: string
}