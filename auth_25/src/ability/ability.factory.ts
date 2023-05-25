import { Injectable } from "@nestjs/common";
import { User } from "../user/entities/user.entity";
import {
  AbilityBuilder,
  createMongoAbility,
  ExtractSubjectType,
  InferSubjects,
  MongoAbility
} from "@casl/ability";

export enum Action {
  Manage = "manage", // all actions
  Create = "create",
  Reade = "reade",
  Update = "update",
  Delete = "delete"
}

// export type Subjects = InferSubjects<typeof User> | <typeof Post> | 'all';
export type Subjects = InferSubjects<typeof User> | "all";

//export type AppAbility = Ability<[Action, Subjects]>;
export type AppAbility = MongoAbility<[Action, Subjects]>;

@Injectable()
export class AbilityFactory {
  defineAbility(user: User) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

    if (user.isAdmin) {
      can(Action.Manage, "all");
      cannot(Action.Manage, User, { orgId: { $ne: user.orgId } })
        .because("You can manage users in yor own organization");

    } else {
      can(Action.Reade, User);
      cannot(Action.Create, User).because("Your can't create new user");
      cannot(Action.Delete, User).because("Your can't delete user");
      cannot(Action.Update, User).because("Your can't update user");

    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>
    });
  }
}
