import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { entities } from "./typeorm";
import { PassportModule } from "@nestjs/passport";
import { GraphQLModule } from "@nestjs/graphql";
import { join } from "path";
import { UserResolver } from "./graphql/resolvers/User.resolver";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";


@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    PassportModule.register({ session: true }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: Number.parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities,
      synchronize: true
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ["./**/*.graphql"],
      definitions: {
        path: join(process.cwd(), "src", "graphql", "index.ts")
        // outputAs: 'class'

      },
      useGlobalPrefix: true
    })
  ],
  controllers: [],
  providers: [UserResolver]
})
export class AppModule {
}
