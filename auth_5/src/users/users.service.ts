import {
  Injectable,
  NotFoundException, OnModuleInit,
  UnprocessableEntityException
} from "@nestjs/common";
import { PasswordService } from "src/auth/services/password.service";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./create-user.dto";
import { UserDto } from "./user.dto";
import { ModuleRef } from "@nestjs/core";

@Injectable()
export class UsersService implements OnModuleInit {

  private passwordService: PasswordService

  constructor(
    private readonly prismaService: PrismaService,
    // private passwordService: PasswordService
    private moduleRef: ModuleRef,
  ) {
  }

  onModuleInit() {
    this.passwordService = this.moduleRef.get(PasswordService, { strict: false });
  }


  async create(data: CreateUserDto) {
    const encryptedPassword = await this.passwordService.hashPassword(
      data.password
    );

    try {
      const { password, ...user } = await this.prismaService.user.create({
        data: {
          ...data,
          password: encryptedPassword
        }
      });
      return user;
    }catch (e) {
      throw new UnprocessableEntityException()
    }

  }

  async findByEmail(email: string): Promise<UserDto> {
    const user = await this.prismaService.user.findFirst({
      where: { email }
    });

    // if (!user) {
    //   throw new NotFoundException();
    // }

    return user;
  }

  async findAll() {
    return this.prismaService.user.findMany();
  }

}
