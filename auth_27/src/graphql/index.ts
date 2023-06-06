
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface IQuery {
    getUser(): Nullable<User> | Promise<Nullable<User>>;
    getUsers(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
}

export interface User {
    id: string;
    username: string;
    email: string;
    avatar?: Nullable<string>;
    roles?: Nullable<Nullable<Role>[]>;
}

export interface Role {
    name: string;
}

type Nullable<T> = T | null;
