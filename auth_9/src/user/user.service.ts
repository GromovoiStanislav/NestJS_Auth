import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto, UpdateUserDto } from "./dto/createUserDto";

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>
  ) {
  }

  async findOne(id: number) {
    console.log('id',id);
    return await this.userRepo.findOne({ where: { id: id } });
  }

  async findAll() {
    return await this.userRepo.find();
  }

  async findOneWithUserName(userName: string) {
    return await this.userRepo.findOneBy({ name: userName });
  }

  async findOneWithUserEmail(email: string) {
    return await this.userRepo.findOneBy({ email });
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepo.create(createUserDto);
    await this.userRepo.save(user);
    const { password, ...result } = user;
    return result;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepo.update(id, updateUserDto);
  }

}
