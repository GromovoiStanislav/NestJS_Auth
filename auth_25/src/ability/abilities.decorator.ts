import { SetMetadata } from "@nestjs/common";
import { Action, Subjects } from "./ability.factory";
import { User } from "../user/entities/user.entity";

export interface RequiredRule {
  action: Action;
  subject: Subjects;
}

export const CHECK_ABILITY_KEY = "check_ability";

export const CheckAbilities = (...requirements: RequiredRule[]) =>
  SetMetadata(CHECK_ABILITY_KEY, requirements);


export class ReadUserAbility implements RequiredRule {
  action = Action.Reade;
  subject = User;
}

export class CreateUserAbility implements RequiredRule {
  action = Action.Create;
  subject = User;
}

export class UpdateUserAbility implements RequiredRule {
  action = Action.Update;
  subject = User;
}

export class DeleteUserAbility implements RequiredRule {
  action = Action.Delete;
  subject = User;
}