import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as session from "express-session";
import * as passport from "passport";
import { DataSource } from "typeorm";
import { TypeORMSession } from "./typeorm";
import { TypeormStore } from "connect-typeorm";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });

  const sessionRepo = app.get(DataSource).getRepository(TypeORMSession);
  app.use(
    session({
      cookie: {
        maxAge: 86400000
      },
      secret: "dahdgasdjhsadgsajhdsagdhjd",
      resave: false,
      saveUninitialized: false,
      store: new TypeormStore().connect(sessionRepo)
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  const PORT = process.env.PORT || 3003;
  await app.listen(PORT, () => console.log(`Running on Port ${PORT}`));
}

bootstrap();
