import { JwtPayload } from 'jsonwebtoken';

export interface IJwtPayload {
  userId: string;
}

export interface IJwtRepository {
  checkToken(token: string): string | JwtPayload;
  createToken(payload: IJwtPayload, secret: string, expiresIn: string): string;
}
