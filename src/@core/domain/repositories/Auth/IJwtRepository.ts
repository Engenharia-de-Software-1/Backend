export interface IJwtPayload {
  userId: string;
  userType: string;
}

export interface IJwtRepository {
  checkToken(token: string, secret: string): IJwtPayload;
  createToken(
    payload: IJwtPayload,
    secret: string,
    expiresIn: string,
  ): Promise<string>;
}
