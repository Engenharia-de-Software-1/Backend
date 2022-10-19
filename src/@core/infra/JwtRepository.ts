import jwt, { JwtPayload } from 'jsonwebtoken';
import {
  IJwtRepository,
  IJwtPayload,
} from './../domain/repositories/Auth/IJwtRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtRepository implements IJwtRepository {
  checkToken(token: string): string | JwtPayload {
    return jwt.decode(token);
  }

  createToken(payload: IJwtPayload, secret: string, expiresIn: string): string {
    return jwt.sign(payload, secret, {
      expiresIn,
    });
  }
}
