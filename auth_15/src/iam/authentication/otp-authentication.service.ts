import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../users/entities/user.entity";
import { Repository } from "typeorm";
import { authenticator } from "otplib";


@Injectable()
export class OtpAuthenticationService {

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(User) private usersRepository: Repository<User>
  ) {
  }

   generateSecret(email: string) {
    const secret = authenticator.generateSecret();
    const appName = this.configService.getOrThrow("TFA_APP_NAME");
    const uri = authenticator.keyuri(email, appName, secret);
    return { uri, secret };
  }

  verifyCode(code: string, secret: string) {
    return authenticator.verify({ token: code, secret });
  }

  async enableTfaForUser(email: string, secret: string) {
    const { id } = await this.usersRepository.findOneOrFail({
      where: { email },
      select: { id: true }
    });
    await this.usersRepository.update(
      { id },
      { isTfaEnabled: true, tfaSecret: secret }
    );
  }

}
