import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomForbiddenException extends HttpException {
  constructor() {
    super('Forbidden, with custom class', HttpStatus.FORBIDDEN);
  }
}

export function CustomForbiddenExceptionFunction(): any {
  return {
    status: HttpStatus.FORBIDDEN,
    message: 'Forbidden, with custom function',
  };
}
