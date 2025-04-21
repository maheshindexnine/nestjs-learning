import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    return this.validateRequest(request);
  }

  private validateRequest(request: Request): boolean {
    const authHeader: string | undefined = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const [scheme, token] = authHeader.split(' ');

    if (scheme !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid authorization header format');
    }

    try {
      // TODO: Implement proper token validation logic here
      // For now, we'll just check if the token exists
      if (!token) {
        throw new UnauthorizedException('Invalid token');
      }
      return true;
    } catch {
      throw new UnauthorizedException('Token is invalid or expired');
    }
  }
}
