import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "../auth/auth.module";
import { BookController } from "./book.controller";
import { BookService } from "./book.service";
import { Book, BookSchema } from "./schemas/book.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
    AuthModule
  ],
  controllers: [BookController],
  providers: [BookService]
})
export class BookModule {
}
