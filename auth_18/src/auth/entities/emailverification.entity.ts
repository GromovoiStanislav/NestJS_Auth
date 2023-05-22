import { IsString, IsEmail, IsNotEmpty, IsDate } from "class-validator";
import { Column, ObjectIdColumn, Entity, ObjectId } from "typeorm";

@Entity()
export class EmailVerificationEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @IsString()
  @IsEmail()
  @Column()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  emailToken: string;

  @IsDate()
  @Column()
  timestamp: Date;
}
