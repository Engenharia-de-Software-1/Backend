import { ForgotPassword } from './../../../../domain/entities/forgotpassword.entity';
import { IForgotPasswordRepository } from './../../../../domain/repositories/IForgotPasswordRepository';
import { Repository, MoreThan } from 'typeorm';

export class ForgotPasswordTypeOrmRepository
  implements IForgotPasswordRepository
{
  constructor(private ormRepo: Repository<ForgotPassword>) {}

  async insert(forgotPassword: ForgotPassword): Promise<void> {
    await this.ormRepo.save(forgotPassword);
  }

  async findById(
    id: string,
    returnNull?: boolean,
  ): Promise<ForgotPassword | null> {
    const forgotPassword = await this.ormRepo.findOne({ where: { id } });
    if (!forgotPassword && returnNull) {
      return null;
    } else if (!forgotPassword) {
      throw new Error('ForgotPassword not found');
    }
    return forgotPassword;
  }

  async findByUnexpiredToken(
    token: string,
    returnNull?: boolean,
  ): Promise<ForgotPassword | null> {
    const forgotPassword = await this.ormRepo.findOne({
      where: { token, expiresAt: MoreThan(new Date()) },
    });
    if (!forgotPassword && returnNull) {
      return null;
    } else if (!forgotPassword) {
      throw new Error('ForgotPassword not found');
    }
    return forgotPassword;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }
}
