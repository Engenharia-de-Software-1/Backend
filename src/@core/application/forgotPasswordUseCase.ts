import { HashRepository } from './../infra/HashRepository';
import { ForgotPassword } from './../domain/entities/forgotpassword.entity';
import {
  IForgotPasswordInput,
  IForgotPasswordOutput,
} from './../domain/dtos/ForgotPasswordDTO';
import { IUserRepository } from './../domain/repositories/IUserRepository';
import { IAdminRepository } from '../domain/repositories/IAdminRepository';
import { BadRequestException } from '@nestjs/common';
import { IMailRepository } from '../domain/repositories/Mail/IMailRepository';
import { IJwtRepository } from '../domain/repositories/Auth/IJwtRepository';
import { IForgotPasswordRepository } from '../domain/repositories/IForgotPasswordRepository';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: '.env.local' });

export class ForgotPasswordUseCase {
  constructor(
    private userRepository: IUserRepository,
    private adminRepository: IAdminRepository,
    private forgotPasswordRepository: IForgotPasswordRepository,
    private mailRepository: IMailRepository,
    private hashRepository: HashRepository,
  ) {}

  async execute(input: IForgotPasswordInput): Promise<any> {
    const { email } = input;

    if (!email) {
      throw new BadRequestException('Email is required');
    }

    const user = await this.userRepository.findByEmail(email, true);
    const admin = await this.adminRepository.findByEmail(email, true);
    if (!user && !admin) return { status: true };

    const type = user ? 'user' : 'admin';

    const token = await this.hashRepository.generateToken(32);

    const forgotPassword = ForgotPassword.create({
      token,
      userId: user ? user.id : admin.id,
      userType: type,
      email,
    });

    try {
      await this.mailRepository.sendForgotPassword(email, token);
    } catch (error) {
      throw new BadRequestException('Erro ao enviar email');
    }

    await this.forgotPasswordRepository.insert(forgotPassword);

    return { status: true };
  }
}
