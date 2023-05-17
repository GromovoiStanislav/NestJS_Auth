import { Injectable } from "@nestjs/common";
import { HashingService } from "../hashing/hashing.service";
import { ulid } from "ulid";

export interface GeneratedApiKeyPayload {
  apiKey: string;
  hashedKey: string;
}

@Injectable()
export class ApiKeysService {

  constructor(private readonly hashingService: HashingService) {
  }

  async createAndHash(id: number): Promise<GeneratedApiKeyPayload> {
    const apiKey = this.generatApiKey(id);
    const hashedKey = await this.hashingService.hash(apiKey);
    return { apiKey, hashedKey };
  }

  async validate(apiKey: string, hashedKey: string): Promise<boolean> {
    return this.hashingService.compare(apiKey, hashedKey);
  }

  extractIdFromApiKey(apiKey: string): string {
    const [id] = Buffer.from(apiKey, "base64").toString("ascii").split(" ");
    return id;
  }

  private generatApiKey(id: number): string {
    const apiKey = `${id} ${ulid()}`; // randomUUID()
    return Buffer.from(apiKey).toString("base64");
  }

}