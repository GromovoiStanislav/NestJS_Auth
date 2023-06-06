import { User } from '../typeorm';

export type UserDetails = {
  username: string;
  email: string;
  password: string;
  avatar: string;
};

export type Done = (err: Error, user: User) => void;
