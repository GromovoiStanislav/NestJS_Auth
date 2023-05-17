import { repl } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  await repl(AppModule);
}
bootstrap();

// npm run start -- --entryFile repl
// await get("UserRepository").update({id: 1},{role: "admin, permissions: ['create_coffee','update_coffee']})
// await get("UserRepository").find({})

// uuid = 'random_uuid'
// payload = await get(ApiKeysService).createAndHash(uuid)
// await get("ApiKeyRepository").save({uuid, key: payload.hashedKey, user: {id: 1}})