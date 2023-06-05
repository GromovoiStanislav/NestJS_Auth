import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Book } from "./schemas/book.schema";
import { Query } from "express-serve-static-core";
import { User } from "../auth/schemas/user.schema";
import { UpdateBookDto } from "./dto/update-book.dto";
import { CreateBookDto } from "./dto/create-book.dto";
import { isValidObjectId, Model } from "mongoose";


@Injectable()
export class BookService {

  constructor(@InjectModel(Book.name) private bookModel: Model<Book>
  ) {
  }

  async findAll(query: Query): Promise<Book[]> {
    const resPerPage = 2;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const keyword = query.keyword
      ? {
        title: {
          $regex: query.keyword,
          $options: "i"
        }
      }
      : {};

    const books = await this.bookModel
      .find({ ...keyword })
      .limit(resPerPage)
      .skip(skip);
    return books;
  }


  async create(book: CreateBookDto, user: User): Promise<Book> {
    const data = Object.assign(book, { user: user._id });
    return this.bookModel.create(data);
  }


  async findById(id: string): Promise<Book> {
    // const isValidId = isValidObjectId(id);
    // if (!isValidId) {
    //   throw new BadRequestException("Please enter correct id.");
    // }

    const book = await this.bookModel.findById(id);
    if (!book) {
      throw new NotFoundException("Book not found.");
    }
    return book;
  }


  async updateById(id: string, book: UpdateBookDto): Promise<Book> {
    await this.findById(id)
    return this.bookModel.findByIdAndUpdate(id, book, {
      new: true,
      runValidators: true
    });
  }


  async deleteById(id: string): Promise<Book> {
    await this.findById(id)
    return this.bookModel.findByIdAndDelete(id);
  }

}
