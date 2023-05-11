import { Injectable } from "@nestjs/common";

@Injectable()
export class CommentService {
  findUserComments(user) {
    return { message: "this is the comments of the user", user };
  }
}
