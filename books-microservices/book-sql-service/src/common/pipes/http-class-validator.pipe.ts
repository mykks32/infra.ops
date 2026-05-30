import { HttpStatus, ValidationPipe } from '@nestjs/common'
import { GlobalHttpException } from '../exceptions/http.exception'

export class HttpClassValidatorPipe extends ValidationPipe {
  constructor() {
    super({
      whitelist: true,
      transform: true,
      enableDebugMessages: /local|development/.test(process.env.NODE_ENV ?? ''),
      exceptionFactory: (errors) => {
        return new GlobalHttpException(
          'inputValidationFailed',
          HttpStatus.BAD_REQUEST,
          { validation: this.flattenValidationErrors(errors) },
        )
      },
    })
  }
}
