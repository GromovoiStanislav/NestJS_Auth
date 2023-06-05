import {
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString
} from "class-validator";
import { User } from "../../auth/schemas/user.schema";
import { Category } from "../schemas/book.schema";

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsEnum(Category, { message: "Please enter correct category." })
  category: Category;

  @IsEmpty({ message: "You cannot pass user id" })
  user?: User;
}
