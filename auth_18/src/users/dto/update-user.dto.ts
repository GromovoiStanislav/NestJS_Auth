import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsEnum
} from "class-validator";
import { UserRoles } from "../../shared/user-roles";

export class UpdateUserDto {
  @ApiProperty({ required: false })
  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly password?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly username?: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  readonly verified?: boolean;

  @ApiProperty({
    required: false,
    enum: UserRoles
  })
  @IsNotEmpty()
  @IsEnum(UserRoles)
  @IsOptional()
  readonly role?: UserRoles;
}
