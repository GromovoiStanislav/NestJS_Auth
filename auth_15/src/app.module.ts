import { Module } from "@nestjs/common";
import { CoffeesModule } from "./coffees/coffees.module";
import { UsersModule } from "./users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { IamModule } from './iam/iam.module';
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "root",
      database: "mydb",
      autoLoadEntities: true,
      synchronize: true
    }),
    CoffeesModule,
    UsersModule,
    IamModule
  ]
})
export class AppModule {
}
