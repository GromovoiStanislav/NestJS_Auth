import { Injectable, UnauthorizedException } from "@nestjs/common";
import { HashingService } from "../hashing/hashing.service";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../users/entities/user.entity";
import { Repository } from "typeorm";
import { SignInDto } from "./dto/sign-in.dto";


@Injectable()
export class SessionAuthenticationService{

  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly hashingService: HashingService
  ) {
  }


  async signIn(signInDto: SignInDto) {
    const user = await this.usersRepository.findOneBy({ email: signInDto.email });
    if (!user) {
      throw new UnauthorizedException("User does not exist");
    }
    const isEqual = await this.hashingService.compare(signInDto.password, user.password);
    if (!isEqual) {
      throw new UnauthorizedException("Password does not match");
    }
    return user;
  }

}