import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ExtractJwt } from 'passport-jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}
  
  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    if (token) {
      try {
        const user = await this.jwtService.verifyAsync(token); // Use verifyAsync
        (req as any).user = user;  // Extend the Request interface
      } catch (e) {
        console.error('Invalid token', e);
      }
    }
    next();
  }
}
