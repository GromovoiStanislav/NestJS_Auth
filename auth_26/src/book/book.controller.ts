import {
  Body,
  Controller,
  Delete,
  Get,
  Param, ParseUUIDPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards
} from "@nestjs/common";
import { BookService } from "./book.service";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import { Book } from "./schemas/book.schema";
import { Query as ExpressQuery } from "express-serve-static-core";
import { AuthGuard } from "@nestjs/passport";
import { ParseMongoIdPipe } from "../ParseMongoIdPipe";

@Controller("books")
export class BookController {

  constructor(
    private bookService: BookService
  ) {
  }


  @Get()
  async getAllBooks(@Query() query: ExpressQuery): Promise<Book[]> {
    return this.bookService.findAll(query);
  }


  @Post()
  @UseGuards(AuthGuard())
  async createBook(
    @Body() book: CreateBookDto,
    @Req() req
  ): Promise<Book> {
    return this.bookService.create(book, req.user);
  }


  @Get(":id")
  async getBook(@Param("id", ParseMongoIdPipe) id: string): Promise<Book> {
    return this.bookService.findById(id);
  }


  @Put(":id")
  @UseGuards(AuthGuard())
  async updateBook(
    @Param("id", ParseMongoIdPipe) id: string,
    @Body() book: UpdateBookDto
  ): Promise<Book> {
    return this.bookService.updateById(id, book);
  }


  @Delete(":id")
  @UseGuards(AuthGuard())
  async deleteBook(@Param("id", ParseMongoIdPipe) id: string): Promise<Book> {
    return this.bookService.deleteById(id);
  }

}
