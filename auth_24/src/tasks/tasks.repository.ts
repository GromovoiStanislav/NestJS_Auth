import { User } from "../auth/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { TaskStatus } from "./task-status.enum";
import { Task } from "./task.entity";
import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";


@Injectable()
export class TasksRepository {
  private logger = new Logger("TasksRepository");

  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>
  ) {
  }


  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;

    const query = this.tasksRepository.createQueryBuilder("task");
    query.where({ user });

    if (status) {
      query.andWhere("task.status = :status", { status });
    }

    if (search) {
      query.andWhere(
        "(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))",
        { search: `%${search}%` }
      );
    }

    try {
      return query.getMany();
    } catch (error) {
      this.logger.error(
        `Failed to get tasks for user "${
          user.username
        }". Filters: ${JSON.stringify(filterDto)}`,
        error.stack
      );
      throw new InternalServerErrorException();
    }
  }


  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.tasksRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user
    });

    return this.tasksRepository.save(task);
  }


  async findOne(id: string, user: User): Promise<Task> {
    return this.tasksRepository.findOne({ where: { id, user } });
  }


  async delete(id: string, user: User) {
    return this.tasksRepository.delete({ id, user });
  }


  async save(task: Task) {
    this.tasksRepository.save(task);
  }

}
