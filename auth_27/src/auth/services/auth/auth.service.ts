import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../../../typeorm";
import { UserDetails } from "../../../utils/types";
import { AuthenticationProvider } from "./auth";

@Injectable()
export class AuthService implements AuthenticationProvider {

  constructor(
    @InjectRepository(User) private userRepo: Repository<User>
  ) {
  }


  async validateUser(email: string, password: string) {
    const user = await this.findUser(email);
    if (user && user.password === password) {
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  }


  async createUser(details: UserDetails) {
    const user = this.userRepo.create(details);
    return this.userRepo.save(user);
  }


  async findUser(email: string): Promise<User | undefined> {
    return this.userRepo.findOneBy({ email });
  }

  async getUsers(): Promise<User[]> {
    return this.userRepo.find({})
  }

}
