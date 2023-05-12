import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  private users: User[] = [
    {
      id: 1,
      name: 'Bob',
      email: 'bob@gmail.com',
      password: 'bobPass',
    },

    {
      id: 2,
      name: 'John',
      email: 'john@gmail.com',
      password: 'johnPass',
    },

    {
      id: 3,
      name: 'Gary',
      email: 'gary@gmail.com',
      password: 'garyPass',
    },
  ];

  async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find((user) => user.email === email);
    if (user) {
      return user;
    }
    return undefined;
  }

  async findOne(id: number): Promise<User | undefined> {
    const user = this.users.find((user) => user.id === id);
    if (user) {
      return user;
    }
    return undefined;
  }
}
