import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus
} from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { ForbiddenError } from "@casl/ability";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {

  constructor(
    private readonly httpAdapterHost: HttpAdapterHost
  ) {
  }

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : exception instanceof ForbiddenError
          ? 403
          : HttpStatus.INTERNAL_SERVER_ERROR;

    // @ts-ignore
    const message = exception?.message || "error"


    const responseBody = {
      statusCode: httpStatus,
      message,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest())
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}