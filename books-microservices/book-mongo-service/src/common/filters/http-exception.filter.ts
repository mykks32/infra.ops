import { Catch, ExceptionFilter, ArgumentsHost, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { GlobalHttpException } from '../exceptions/http.exception';
import { response } from '../utils/reponse';

@Catch(GlobalHttpException)
export class GlobalHttpExceptionFilter implements ExceptionFilter {
  logger = new Logger(GlobalHttpExceptionFilter.name);

  catch(exception: GlobalHttpException, host: ArgumentsHost): void {
    console.error(exception);

    const http = host.switchToHttp();
    const req = http.getRequest<Request>();
    const res = http.getResponse<Response>();

    exception.payload = req.body as object;
    exception.requestId = req.headers['x-request-id'] as string;

    res
      .status(exception.statusCode)
      .json(response(GlobalHttpException, exception));
  }
}
