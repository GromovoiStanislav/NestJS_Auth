import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Role} from "../auth/role.entity";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    username: string

    @Column({select: false})
    password: string

    @ManyToMany(() => Role)
    @JoinTable({
        name: "users_to_roles",
        joinColumn: {
            name: "user_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "role_id",
            referencedColumnName: "id"
        }
    })
    roles: Role[]
}