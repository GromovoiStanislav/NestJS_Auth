import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { LoginUserDto } from "./LoginUser.dto";

export class CreateUserDto extends LoginUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}