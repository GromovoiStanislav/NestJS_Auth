import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AbilityFactory } from "./ability.factory";
import { CHECK_ABILITY_KEY, RequiredRule } from "./abilities.decorator";
import { ForbiddenError } from "@casl/ability";
import { currentUser } from "../user/current-user";

@Injectable()
export class AbilitiesGuard implements CanActivate {

  constructor(
    private reflector: Reflector,
    private abilityFactory: AbilityFactory
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rules = this.reflector.get<RequiredRule[]>(CHECK_ABILITY_KEY, context.getHandler()) || [];

    // const { user } = context.switchToHttp().getRequest();
    const user = currentUser;
    const ability = this.abilityFactory.defineAbility(user);

    rules.forEach(rule =>
      ForbiddenError.from(ability).throwUnlessCan(rule.action, rule.subject)
    );
    return true;

    /** moved in global exception filter
     try {
       rules.forEach(rule =>
         ForbiddenError.from(ability).throwUnlessCan(rule.action, rule.subject)
       );
       return true;

    } catch (err) {
      if (err instanceof ForbiddenError) {
        throw new ForbiddenException(err.message);
      }
    }
     */

  }

}