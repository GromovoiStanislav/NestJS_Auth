import {
  IsEmpty,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString
} from "class-validator";
import { User } from "../../auth/schemas/user.schema";
import { Category } from "../schemas/book.schema";

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsEnum(Category, { message: "Please enter correct category." })
  category?: Category;

  @IsEmpty({ message: "You cannot pass user id" })
  user?: User;
}
