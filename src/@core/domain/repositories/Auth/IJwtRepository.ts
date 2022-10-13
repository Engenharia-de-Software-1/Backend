export interface IJwtPayload {
  userId: string;
}

export interface IJwtRepository {
  checkToken(token: string): Promise<any>;
  createToken(payload: IJwtPayload, secret: string, expiresIn: string): string;
}
