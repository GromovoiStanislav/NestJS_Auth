import { Policy } from "./interfaces/policy.interface";
import { Injectable } from "@nestjs/common";
import { PolicyHandler } from "./interfaces/policy-handler.interface";
import { ActiveUserData } from "../../interfaces/active-user-data.interface";
import { PolicyHandlerStorage } from "./policy-handlers.storage";

export class FrameworkContributorPolicy implements Policy {
  name = "FrameworkContributor";
}

@Injectable()
export class FrameworkContributorPolicyHandler implements PolicyHandler<FrameworkContributorPolicy> {

  constructor(private policyHandlerStorage: PolicyHandlerStorage) {
    this.policyHandlerStorage.add(FrameworkContributorPolicy, this);
  }


  async handle(policy: FrameworkContributorPolicy, user: ActiveUserData): Promise<void> {
   const isCContributor = user.email.endsWith("@nestjs.com")
    if (!isCContributor){
      throw new Error('User is not contributor')
    }


  }
}