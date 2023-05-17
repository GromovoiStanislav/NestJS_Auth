import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CoffeesService } from "./coffees.service";
import { CreateCoffeeDto } from "./dto/create-coffee.dto";
import { UpdateCoffeeDto } from "./dto/update-coffee.dto";
import { ActiveUser } from "../iam/decorators/active-user.decorator";
import { ActiveUserData } from "../iam/interfaces/active-user-data.interface";
import { Roles } from "../iam/authorization/decorators/roles.decorator";
import { Role } from "../users/enums/role.enum";
import { Permissions } from "../iam/authorization/decorators/permissions.decorator";
import { Permission } from "../iam/authorization/permission.type";
import { Policies } from "../iam/authorization/decorators/policies.decorator";
import { FrameworkContributorPolicy } from "../iam/authorization/policies/framework-contributor.policy";
import { Auth } from "../iam/authentication/decorators/auth.decorator";
import { AuthType } from "../iam/authentication/enums/auth-type.enum";


@Auth(AuthType.Bearer, AuthType.ApiKey)
@Controller("coffees")
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {
  }

  @Permissions(Permission.CreateCoffee)
  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeesService.create(createCoffeeDto);
  }

  @Policies(new FrameworkContributorPolicy() /** new MinAgePolicy(18), new OnlyAdminPolicy() */)
  @Get()
  findAll(@ActiveUser() user: ActiveUserData) {
    const data = this.coffeesService.findAll();
    return { data, user };
  }

  @Get(":id")
  findOne(
    @Param("id") id: string,
    @ActiveUser() user: ActiveUserData
  ) {
    const data = this.coffeesService.findOne(+id);
    return { data, user };
  }

  @Permissions(Permission.UpdateCoffee)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeesService.update(+id, updateCoffeeDto);
  }


  @Permissions(Permission.DeleteCoffee)
  @Roles(Role.Admin)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.coffeesService.remove(+id);
  }
}
