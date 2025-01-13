import { ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly jwtService: JwtService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = this.getJWT(request);
      if (!token) throw new Error('TOKEN NEEDED');
      const tokenDecoded = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      request.user = tokenDecoded;
      return true;
    } catch (error) {
      throw new Error('TOKEN NEEDED');
    }
  }

  private getJWT(request: Request): string {
    return request.headers && request.headers.authorization
      ? (request.headers.authorization.split(' ')[1] ?? '')
      : null;
  }
}
