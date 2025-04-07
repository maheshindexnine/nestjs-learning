import { Injectable } from '@nestjs/common';

export interface HelloObject {
  data: string;
  success: boolean;
}

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  postHello(): HelloObject {
    return { data: 'hellow world', success: true };
  }
}
