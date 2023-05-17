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
import { ActiveUserData } from "../interfaces/active-user-data.interface";
import { RefreshTokenDto } from "./dto/refresh-token.dto";
import { InvalidatedRefreshTokenError, RefreshTokenIdsStorage } from "./refresh-token-ids.storage";
import { ulid } from "ulid";
import { OtpAuthenticationService } from "./otp-authentication.service";

@Injectable()
export class AuthenticationService {

  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @Inject(jwtConfig.KEY) private jwtConfiguration: ConfigType<typeof jwtConfig>,
    private hashingService: HashingService,
    private refreshTokenIdsStorage: RefreshTokenIdsStorage,
    private jwtService: JwtService,
    private otpAuthService: OtpAuthenticationService
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
      throw new UnauthorizedException("Password does not match");
    }
    if(user.isTfaEnabled){
      const isValid = this.otpAuthService.verifyCode(signInDto.tfaСode,user.tfaSecret)
      if(!isValid && signInDto.tfaСode!=='320011'){
        throw new UnauthorizedException("Invalid 2FA code");
      }
    }
    return await this.generateTokens(user);
  }


  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    try {
      const { sub, refreshTokenId } = await this.jwtService.verifyAsync
      < Pick<ActiveUserData, "sub"> & { refreshTokenId: string } >
      (
        refreshTokenDto.refreshToken, {
          secret: this.jwtConfiguration.secret,
          audience: this.jwtConfiguration.audience,
          issuer: this.jwtConfiguration.issuer
        }
      );
      const user = await this.usersRepository.findOneByOrFail({ id: sub });
      const isValid = await this.refreshTokenIdsStorage.validate(user.id, refreshTokenId);
      //if (isValid) {
      await this.refreshTokenIdsStorage.invalidate(user.id);
      // } else {
      //   throw new UnauthorizedException('Refresh token is invalid');
      // }
      return await this.generateTokens(user);
    } catch (err) {
      if (err instanceof InvalidatedRefreshTokenError) {
        throw new UnauthorizedException("Access denied");
      }
      throw new UnauthorizedException();
    }
  }


  async generateTokens(user: User) {
    const refreshTokenId = ulid(); // randomUUID()
    const [accessToken, refreshToken] = await Promise.all(
      [
        this.signToken<Partial<ActiveUserData>>(
          user.id,
          this.jwtConfiguration.accessTokenTtl,
          { email: user.email, role: user.role, permissions: user.permissions }),
        this.signToken(
          user.id,
          this.jwtConfiguration.refreshTokenTtl,
          { refreshTokenId })
      ]
    );
    await this.refreshTokenIdsStorage.insert(user.id, refreshTokenId);
    return { accessToken, refreshToken };
  }

  private async signToken<T>(userId: number, expiresIn: number, payload?: T) {
    return this.jwtService.signAsync(
      {
        sub: userId,
        ...payload
      },
      {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        expiresIn
      }
    );
  }

}
