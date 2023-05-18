import { PassportSerializer } from "@nestjs/passport";
import { ActiveUserData } from "../../interfaces/active-user-data.interface";
import { User } from "../../../users/entities/user.entity";

export class UserSerializer extends PassportSerializer {

  serializeUser(user: User, done: (err: Error, user: ActiveUserData) => void) {
    done(null, {
      sub: user.id,
      email: user.email,
      role: user.role,
      permissions: user.permissions
    });
  }

  deserializeUser(payload: ActiveUserData, done: (err: Error, user: ActiveUserData) => void) {
    done(null, payload);
  }
}