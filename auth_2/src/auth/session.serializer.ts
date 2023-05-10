import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { UsersService } from "../users/users.service";

@Injectable()
export class SessionSerializer extends PassportSerializer {

  constructor(private usersService: UsersService) {
    super();
  }

  serializeUser(user: any, done: (err: Error, user: any) => void): any {
    done(null, { id: user.id });
  }

  async deserializeUser(payload: any, done: (err: Error, user: any) => void): Promise<any> {
    const user = await this.usersService.findById(payload.id);
    done(null, user);
  }
}