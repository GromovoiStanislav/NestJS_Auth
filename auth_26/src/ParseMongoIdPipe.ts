import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { isValidObjectId } from "mongoose";

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    //console.log(metadata);  // -> { metatype: [Function: String], type: 'param', data: 'id' }
    const isValidId = isValidObjectId(value);
    if (!isValidId) {
      throw new BadRequestException("Please enter correct id.");
    }
    return value;
  }
}