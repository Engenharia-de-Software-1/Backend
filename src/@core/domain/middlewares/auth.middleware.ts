import { AdminTypeOrmRepository } from './../../infra/db/typeorm/repository/AdminTypeOrmRepository';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtRepository } from 'src/@core/infra/JwtRepository';
import { IJwtPayload } from '../../domain/repositories/Auth/IJwtRepository';
import { UserTypeOrmRepository } from '../../infra/db/typeorm/repository/UserTypeOrmRepository';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: '.env.local' });

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private userRepository: UserTypeOrmRepository,
    private adminRepository: AdminTypeOrmRepository,
    private jwtService: JwtRepository,
  ) {}

  async use(req: Request | any, res: Response, next: NextFunction) {
    const bearerHeader = req.headers.authorization;
    const accessToken = bearerHeader && bearerHeader.split(' ')[1];
    let user;
    let admin;

    if (!bearerHeader || !accessToken) {
      return res.status(400).json({ error: 'Unauthorized' });
    }

    try {
      const { userId, userType }: IJwtPayload = this.jwtService.checkToken(
        accessToken,
        process.env.JWT_SECRET,
      );
      if (userType === 'admin') {
        admin = await this.adminRepository.findById(userId);
      } else {
        user = await this.userRepository.findByIdWithRelations(userId);
      }
    } catch (error) {
      return res.status(400).json({ error: 'Unauthorized' });
    }

    if (user) req.user = user;
    if (admin) req.admin = admin;

    next();
  }
}
