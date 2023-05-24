import {
  ConflictException, Injectable,
  InternalServerErrorException
} from "@nestjs/common";
import { Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";
import * as bcrypt from "bcrypt";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>
  ) {
  }


  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.usersRepository.create({ username, password: hashedPassword });

    try {
      await this.usersRepository.save(user);
    } catch (error) {
      if (error.code === "23505") {
        // duplicate username
        throw new ConflictException("Username already exists");
      } else {
        throw new InternalServerErrorException();
      }
    }
  }


  async findByName(username: string): Promise<User> {
    return this.usersRepository.findOneBy({username})
  }

}
