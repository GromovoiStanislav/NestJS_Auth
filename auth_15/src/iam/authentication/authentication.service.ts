import { ConflictException, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { HashingService } from "../hashing/hashing.service";
import { SignUpDto } from "./dto/sign-up.dto";
import { SignInDto } from "./dto/sign-in.dto";
import { JwtService } from "@nestjs/jwt";
import jwtConfig from "../config/jwt.config";
import { ConfigType } from "@nestjs/config";

@Injectable()
export class AuthenticationService {

  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private hashingService: HashingService,
    private jwtService: JwtService,
    @Inject(jwtConfig.KEY) private jwtConfiguration: ConfigType<typeof jwtConfig>
  ) {
  }

  async signUp(signUpDto: SignUpDto) {

    try {
      const user = new User();
      user.email = signUpDto.email;
      user.password = await this.hashingService.hash(signUpDto.password);
      await this.usersRepository.save(user);

    } catch (err) {
      if (err.code === "23505") {
        throw new ConflictException();
      }
      throw err;
    }
  }


  async signIn(signInDto: SignInDto) {
    const user = await this.usersRepository.findOneBy({ email: signInDto.email });
    if (!user) {
      throw new UnauthorizedException("User does not exist");
    }

    const isEqual = await this.hashingService.compare(signInDto.password, user.password);
    if (!isEqual) {
      throw new UnauthorizedException("password does not match");
    }
    return this.jwtService.signAsync(
      {
        sub: user.id,
        eail: user.email
      },
      {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        expiresIn: this.jwtConfiguration.accessTokenTtl
      }
    ) ;
  }

}
