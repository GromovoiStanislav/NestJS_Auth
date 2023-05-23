import { IsEmail, IsString, MinLength } from "class-validator";

export class AuthDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3)
  password: string;
}
