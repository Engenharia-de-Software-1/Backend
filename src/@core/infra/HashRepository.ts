import { IHashRepository } from '../domain/repositories/IHashRepository';
import crypto from 'crypto';

export class HashRepository implements IHashRepository {
  public async generateHash(payload: string): Promise<string> {
    const hash = crypto.createHash('sha256');
    hash.update(payload);
    const theHash = hash.digest('hex');
    return theHash;
  }
  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    const theHash = await this.generateHash(payload);
    return theHash === hashed;
  }
}
