import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class CustomValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!Number(value))
      throw new HttpException(
        {
          customMessage: 'This is custom message object',
        },
        HttpStatus.BAD_REQUEST,
      );
    return Number(value) + 20;
  }
}
