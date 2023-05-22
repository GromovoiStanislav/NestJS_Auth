import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { Repository } from "typeorm";
import { ObjectId } from 'mongodb';
import { User } from "./user.interface";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOneByEmail(email): Promise<User> {
    return await this.userRepository.findOneBy({ email });
  }

  async findOneById(id): Promise<User> {
    return await this.userRepository.findOneBy({_id: new ObjectId(id) });
  }


  async update(id: string , newUser: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ _id: new ObjectId(id) });
    const userWithEmail = await this.userRepository.findOneBy({ email: newUser.email });

    if (!user) {
      throw new HttpException("User doesn't exists", HttpStatus.BAD_REQUEST);
    } else if (
      userWithEmail && newUser.email !== user.email
    ) {
      throw new HttpException("Email is already used", HttpStatus.BAD_REQUEST);
    }

    await this.userRepository.merge(user, newUser);
    return this.userRepository.save(user);
  }

  async deleteUserById(id: string) {
    const user= await this.userRepository.findOneBy({ _id: new ObjectId(id) });

    if (user === undefined || user === null) {
      throw new HttpException("User doesn't exists", HttpStatus.BAD_REQUEST);
    }

    return await this.userRepository.delete(id);
  }

  async deleteAll() {
    return await this.userRepository.clear();
  }
}
