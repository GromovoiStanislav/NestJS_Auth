import { Injectable } from "@nestjs/common";
import * as fs from "node:fs";
import * as dotenv from "dotenv";

@Injectable()
export class ConfigService {

  // private readonly envConfig: { [key: string]: string };
  private readonly envConfig: Record<string, string>;

  constructor(filePath: string) {
    this.envConfig = dotenv.parse(fs.readFileSync(filePath));
  }

  get(key: string) {
    return this.envConfig[key]
  }

}