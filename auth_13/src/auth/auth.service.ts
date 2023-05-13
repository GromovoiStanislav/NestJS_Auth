import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { from, Observable } from "rxjs";
import { UserI } from "src/user/models/user.interface";
//const bcrypt = require("bcrypt");
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {

  constructor(private readonly jwtService: JwtService) {
  }


  generateJwt(user: UserI): Observable<string> {
    return from(this.jwtService.signAsync({ user }));
  }


  hashPassword(password: string): Observable<string> {
    return from(bcrypt.hash(password, 12));
  }


  comparePasswords(password: string, storedPasswordHash: string): Observable<boolean> {
    return from(bcrypt.compare(password, storedPasswordHash));
  }

}
