import { HashRepository } from './../infra/HashRepository';
import { Administrator } from './../domain/entities/administrator.entity';
import { UnauthorizedException } from '@nestjs/common';
import { ForgotPassword } from './../domain/entities/forgotpassword.entity';
import { IChangePasswordInput } from './../domain/dtos/ForgotPasswordDTO';
import { IUserRepository } from './../domain/repositories/IUserRepository';
import { IAdminRepository } from '../domain/repositories/IAdminRepository';
import { IForgotPasswordRepository } from '../domain/repositories/IForgotPasswordRepository';
import { User } from '../domain/entities/user.entity';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: '.env.local' });

export class ChangeForgotPasswordUseCase {
  constructor(
    private userRepository: IUserRepository,
    private adminRepository: IAdminRepository,
    private forgotPasswordRepository: IForgotPasswordRepository,
    private hashRepository: HashRepository,
  ) {}

  async execute(token: string, input: IChangePasswordInput): Promise<any> {
    console.log(token, input);

    const forgotPassword =
      await this.forgotPasswordRepository.findByUnexpiredToken(token, true);

    if (!forgotPassword) {
      throw new UnauthorizedException('Token inválido');
    }

    if (!input.password) {
      throw new UnauthorizedException('Senha é obrigatória');
    }

    const repos = {
      user: this.userRepository,
      admin: this.adminRepository,
    };

    const entities = {
      user: User,
      admin: Administrator,
    };

    const forgotPasswordEntity = ForgotPassword.create(forgotPassword);
    const { userId, userType } = forgotPasswordEntity;

    const repo = repos[forgotPassword.userType];
    const user = await repo.findById(userId);

    const entity = entities[userType];
    const forUpdate = entity.create(user);

    forUpdate.updatePassword(input.password);
    forUpdate.validatePassword();
    forUpdate.validateIfPasswordMatch(input.confirmPassword);
    const hashedPassword = await this.hashRepository.generateHash(
      input.password,
    );
    forUpdate.updatePassword(hashedPassword);

    repo.update(userId, forUpdate);

    await this.forgotPasswordRepository.delete(forgotPassword.id);

    return { status: true };
  }
}
