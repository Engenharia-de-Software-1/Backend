import { ForgotPasswordUseCase } from './../../@core/application/forgotPasswordUseCase';
import { IForgotPasswordInput } from './../../@core/domain/dtos/ForgotPasswordDTO';
import { Controller, Post, Body } from '@nestjs/common';

@Controller('forgot')
export class ForgotPasswordController {
  constructor(private readonly forgotPasswordUseCase: ForgotPasswordUseCase) {}

  @Post()
  async create(@Body() forgotpassowrdDto: IForgotPasswordInput) {
    return await this.forgotPasswordUseCase.execute(forgotpassowrdDto);
  }
}
