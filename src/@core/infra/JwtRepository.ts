import jwt, { JwtPayload } from 'jsonwebtoken';
import {
  IJwtRepository,
  IJwtPayload,
} from './../domain/repositories/Auth/IJwtRepository';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class JwtRepository implements IJwtRepository {
  async checkToken(token: string, secret: string): Promise<string | JwtPayload> {
    return jwt.verify(token, secret);
  }

  async createToken(payload: IJwtPayload, secret: string, expiresIn: string): Promise<string> {
    return jwt.sign(payload, secret, {
      expiresIn,
    });;
  }
}
