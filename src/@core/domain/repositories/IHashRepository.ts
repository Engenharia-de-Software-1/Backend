export interface IHashRepository {
  generateHash(payload: string): Promise<string>;
  compareHash(payload: string, hashed: string): Promise<boolean>;
  generateToken(length: number): Promise<string>;
}
