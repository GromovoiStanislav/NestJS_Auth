import { NestFactory } from "@nestjs/core";
import * as session from "express-session";
import RedisStore from "connect-redis";
import IoRedis from "ioredis";
import { AppModule } from "./app.module";


const redisClient = new IoRedis("redis://localhost:6379");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // we add sessions middleware
  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: "super-secret",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true, // prevents javascript from accessing the cookies
        maxAge: 1000 * 60 * 15 // cookie expiration date = 15 minutes
      }
    })
  );

  await app.listen(3000);
}

bootstrap();
