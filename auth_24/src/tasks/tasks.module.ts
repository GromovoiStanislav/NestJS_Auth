import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";
import { Task } from "./task.entity";
import { TasksRepository } from "./tasks.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    AuthModule
  ],
  controllers: [TasksController],
  providers: [TasksService, TasksRepository]
})
export class TasksModule {
}
