import { User } from '../../../typeorm';
import { UserDetails } from '../../../utils/types';

export interface AuthenticationProvider {
  validateUser(email: string, password: string);
  createUser(details: UserDetails): Promise<User>;
  findUser(discordId: string): Promise<User | undefined>;
  getUsers(): Promise<User[]>;
}
