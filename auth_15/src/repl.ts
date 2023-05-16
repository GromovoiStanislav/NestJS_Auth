import { repl } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  await repl(AppModule);
}
bootstrap();

// npm run start -- --entryFile repl
// await get("UserRepository").update({id: 3},{role: "admin, permissions: ['create_coffee','update_coffee']})
// await get("UserRepository").find({})