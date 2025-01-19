import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | object = (exception as Error).message;
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse();

      if (typeof message === 'object') {
        message = Object.values(message)[0];
        response.status(status).json({
          message,
          statusCode: status,
          path: request.url,
          timestamp: new Date().toISOString(),
        });
        return;
      }

      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: (exception as Error).message,
      });
    } else {
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message,
      });
    }
  }
}
