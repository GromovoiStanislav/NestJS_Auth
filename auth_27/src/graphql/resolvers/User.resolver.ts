import {
  createParamDecorator,
  ExecutionContext,
  Inject,
  UseGuards
} from "@nestjs/common";
import {
  GqlExecutionContext,
  Parent,
  Query,
  ResolveField,
  Resolver
} from "@nestjs/graphql";
import { GraphQLAuthGuard } from "src/auth/utils/Guards";
import { AuthenticationProvider } from "src/auth/services/auth/auth";
import { User } from "src/typeorm";


export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  }
);

@Resolver("User")
// @UseGuards(GraphQLAuthGuard)
export class UserResolver {

  constructor(
    @Inject("AUTH_SERVICE") private readonly authService: AuthenticationProvider
  ) {
  }


  @Query("getUsers")
  async getUsers(): Promise<User[]> {
    return this.authService.getUsers();
  }


  @UseGuards(GraphQLAuthGuard)
  @Query("getUser")
  async getUser(@CurrentUser() user: User): Promise<User> {
    return user;
  }


  @UseGuards(GraphQLAuthGuard)
  @ResolveField()
  async roles(@Parent() user: User) {
    return [{ name: "Admin" }];
  }

}
