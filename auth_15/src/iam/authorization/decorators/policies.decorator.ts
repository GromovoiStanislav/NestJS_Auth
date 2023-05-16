import { SetMetadata } from '@nestjs/common';
import { POLICIES_KEY } from "../../iam.constants";
import { Policy } from "../policies/interfaces/policy.interface";

export const Policies = (...policies: Policy[]) => SetMetadata(POLICIES_KEY, policies);