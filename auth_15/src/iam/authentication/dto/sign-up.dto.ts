import { IsEmail, MinLength } from "class-validator";

export class SignUpDto {
  @IsEmail()
  email: string;

  @MinLength(3)
  password: string;
}
