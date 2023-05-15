import { IsEmail, MinLength } from "class-validator";

export class SignInDto {
  @IsEmail()
  email: string;

  @MinLength(3)
  password: string;
}
