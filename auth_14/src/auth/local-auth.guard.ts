import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class LocalAuthGuard extends AuthGuard("local") {

  handleRequest(err: any, user: any, info: any, context: any, status: any) {

    const request = context.switchToHttp().getRequest();
    const { email, password } = request.body;

    if (err || !user) {
      if (!email) {
        throw new BadRequestException({ message: "email - не может быть пустым" });
      } else if (!password) {
        throw new BadRequestException({ message: "password - не может быть пустым" });
      } else {
        throw new UnauthorizedException("Invalid credentials");
      }
    }

    return user;
    // return super.handleRequest(err, user, info, context, status);
  }

}