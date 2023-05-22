import { ObjectId } from "mongodb";

export interface User {
  _id: string | ObjectId;
  email: string;
  verified: boolean;
  username: string;
}
