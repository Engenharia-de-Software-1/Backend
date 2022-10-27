import { ForbiddenException, Injectable, NestMiddleware } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NextFunction, Request, Response } from "express";
import { UserSchema } from "src/@core/infra/db/typeorm/schema/UserSchema";
import { JwtRepository } from "src/@core/infra/JwtRepository";
import { Repository } from "typeorm";
import {
  IJwtRepository,
  IJwtPayload,
} from '../../domain/repositories/Auth/IJwtRepository';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { UserTypeOrmRepository } from '../../infra/db/typeorm/repository/UserTypeOrmRepository';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: '.env.local' });

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private userRepository: UserTypeOrmRepository,
    private jwtService: JwtRepository
  ) {}

  async use(req: Request | any, res: Response, next: NextFunction) {
    const bearerHeader = req.headers.authorization;
    const accessToken = bearerHeader && bearerHeader.split(' ')[1];
    let user;

    if (!bearerHeader || !accessToken) {
      return res.status(400).json({'error': 'Unauthorized'});
    }

    try {
      const { userId }: IJwtPayload = await this.jwtService.checkToken(accessToken, process.env.JWT_SECRET);
      user = await this.userRepository.findByIdWithRelations(userId);
    } catch (error) {
      return res.status(400).json({'error': 'Unauthorized'});
    }

    req.user = user;

    next();
  }
}