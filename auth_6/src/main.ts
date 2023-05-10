import { NestFactory } from "@nestjs/core";
import { AppModule } from "src/app.module";
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: process.env.CLIENT_URL, credentials: true }
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true
  }));

  app.use(cookieParser());

  await app.listen(3000);
}

bootstrap();
