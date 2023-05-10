import { Injectable } from "@nestjs/common";



export type User = {
  id:number;
  name:string;
  username:string;
  password:string
}


@Injectable()
export class UsersService {

  private readonly users: User[]=[
    {
      id: 1,
      name: 'Mark',
      username: 'mark',
      password: '123'
    },
    {
      id: 12,
      name: 'Tom',
      username: 'tom',
      password: '123'
    },
  ]

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username)
  }

  async findById(id: number): Promise<User | undefined> {
    return this.users.find(user => user.id === id)
  }

}