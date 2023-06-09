import {
  Body,
  CacheTTL,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors
} from "@nestjs/common";
import { CacheInterceptor, CacheKey } from "@nestjs/cache-manager";
import { GetUserId } from "../auth/decorators";
import { PaginateDto } from "../common/dto";
import { CreateExpenseDto, UpdateExpenseDto } from "./dto";
import { ExpenseService } from "./expense.service";

@Controller("expense")
export class ExpenseController {

  constructor(
    private expenseService: ExpenseService
  ) {
  }


  @UseInterceptors(CacheInterceptor)
  // @ts-ignore
  @CacheTTL({ ttl: 10 })
  @CacheKey("getAllUserExpenses")
  @Get()
  getAllUserExpenses(
    @GetUserId() userId: number,
    @Query() paginate: PaginateDto
  ) {
    console.log("userId", userId);
    return this.expenseService.getAllUserExpenses(userId, paginate);
  }


  @Get(":id")
  getUserExpenseById(
    @GetUserId() userId: number,
    @Param("id") expenseId: number
  ) {
    return this.expenseService.getUserExpenseById(userId, expenseId);
  }


  @Post()
  createExpense(
    @GetUserId() userId: number,
    @Body() dto: CreateExpenseDto
  ) {
    return this.expenseService.createExpense(userId, dto);
  }


  @Patch(":id")
  updateUserExpenseById(
    @GetUserId() userId: number,
    @Param("id") expenseId: number,
    @Body() dto: UpdateExpenseDto
  ) {
    return this.expenseService.updateUserExpenseById(userId, expenseId, dto);
  }


  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(":id")
  deleteUserExpenseById(
    @GetUserId() userId: number,
    @Param("id") expenseId: number
  ) {
    return this.expenseService.deleteUserExpenseById(userId, expenseId);
  }

}
