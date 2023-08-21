import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import { CustomLoggerService } from '../logger/logger.service';
import { HttpAdapterHost } from '@nestjs/core';
import { REQUEST_ERRORS } from 'src/constants';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  private logger = new CustomLoggerService('HttpException');
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const request = ctx.getRequest<Request>();

    const { ip, method, originalUrl, query, body } = request;
    const userAgent = request.get('user-agent') || '';

    const responseBody = {
      statusCode,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      message:
        exception instanceof HttpException
          ? exception.message
          : REQUEST_ERRORS.INTERNAL_SERVER_ERROR,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);

    const message = `${method} ${originalUrl} ${statusCode} query params: ${JSON.stringify(
      query,
    )}, body: ${JSON.stringify(body)}\n`;

    if (exception instanceof HttpException) {
      this.logger.error(message, exception.stack, exception.name);
    } else if (exception instanceof Error) {
      this.logger.error(
        message,
        exception.stack,
        REQUEST_ERRORS.INTERNAL_SERVER_ERROR,
      );
    } else {
      this.logger.error(
        message,
        'no-trace',
        REQUEST_ERRORS.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
