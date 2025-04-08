import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// Define the user interface
interface User {
  name: string;
  age: number;
}

// Extend Express Request type to include user
declare module 'express' {
  interface Request {
    user?: User;
  }
}

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    req.user = {
      name: 'mahesh user',
      age: 10,
    };
    next();
  }
}
