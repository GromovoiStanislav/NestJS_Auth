import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre(
  'save',
  async function (next: mongoose.CallbackWithoutResultAndOptionalError) {
    const user = this as UserDocument;
    try {
      // if (!this.isModified('password')) {
      if (!user.isModified('password')) {
        return next();
      }
      // this['password'] = await bcrypt.hash(this['password'], 10);
      user.password = await bcrypt.hash(user.password, 10);

      return next();
    } catch (err) {
      return next(err);
    }
  }
);
