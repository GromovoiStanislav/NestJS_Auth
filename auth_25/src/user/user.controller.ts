import { Body, Controller, Delete, ForbiddenException, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AbilityFactory, Action } from "../ability/ability.factory";
import { User } from "./entities/user.entity";
import { ForbiddenError } from "@casl/ability";
import { CheckAbilities, ReadUserAbility } from "../ability/abilities.decorator";
import { AbilitiesGuard } from "../ability/abilities.guard";
import { currentUser } from "./current-user";


@Controller("users")
export class UserController {

  constructor(
    private readonly userService: UserService,
    private readonly abilityFactory: AbilityFactory
  ) {
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const user = currentUser; // req.user

    const ability = this.abilityFactory.defineAbility(user);
    const isAllowed = ability.can(Action.Create, User);
    if (!isAllowed) {
      throw new ForbiddenException("Your can't create new user");
    } else {
      return this.userService.create(createUserDto);
    }

  }

  @Get()
  @CheckAbilities(new ReadUserAbility())
  // @UseGuards(AbilitiesGuard)
  findAll() {
    return this.userService.findAll();
  }


  @Get(":id")
  @CheckAbilities({ action: Action.Reade, subject: User })
  // @UseGuards(AbilitiesGuard)
  findOne(@Param("id") id: string) {
    return this.userService.findOne(+id);
  }


  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = currentUser; // req.user
    return this.userService.update(+id, updateUserDto, user);
  }


  @Delete(":id")
  remove(@Param("id") id: string) {
    const user = currentUser; // req.user

    const ability = this.abilityFactory.defineAbility(user);
    //ForbiddenError.from(ability).throwUnlessCan(Action.Delete, User);
    ForbiddenError.from(ability).setMessage("Your can not delete user").throwUnlessCan(Action.Delete, User);

    return this.userService.remove(+id);

    /** moved in global exception filter
     try {
      ForbiddenError.from(ability).setMessage("Your can't delete user").throwUnlessCan(Action.Delete, User);
      return this.userService.remove(+id);

    } catch (err) {
      if (err instanceof ForbiddenError) {
        throw new ForbiddenException(err.message);
      }
    }
     */
  }

}
