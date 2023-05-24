import { NotFoundException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { TaskStatus } from "./task-status.enum";
import { TasksRepository } from "./tasks.repository";
import { TasksService } from "./tasks.service";

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn()
});

const mockUser = {
  username: "Ariel",
  id: "someId",
  password: "somePassword",
  tasks: []
};

const mockTask = {
  title: "Test title",
  description: "Test desc",
  id: "someId",
  status: TaskStatus.OPEN
};

describe("TasksService", () => {
  let tasksService: TasksService;
  let tasksRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: mockTasksRepository }
      ]
    }).compile();

    tasksService = module.get(TasksService);
    tasksRepository = module.get(TasksRepository);
  });

  describe("getTasks", () => {
    it("calls TasksRepository.getTasks and returns the result", async () => {

      const mockResult = [
        mockTask
      ];

      tasksRepository.getTasks.mockResolvedValue(mockResult);
      const result = await tasksService.getTasks(null, mockUser);
      expect(result).toEqual(mockResult);
    });
  });

  describe("getTaskById", () => {

    it("calls TasksRepository.findOne and returns the result", async () => {
      tasksRepository.findOne.mockResolvedValue(mockTask);
      const result = await tasksService.getTaskById("someId", mockUser);
      expect(result).toEqual(mockTask);
    });

    it("calls TasksRepository.findOne and handles an error", async () => {
      tasksRepository.findOne.mockResolvedValue(null);
      await expect(tasksService.getTaskById("someId", mockUser))
        .rejects.toThrow(NotFoundException);
    });
  });

});
