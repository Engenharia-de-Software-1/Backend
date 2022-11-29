import { ChangeForgotPasswordUseCase } from './../../@core/application/changeForgotPasswordUseCase';
import { ForgotPasswordUseCase } from './../../@core/application/forgotPasswordUseCase';
import {
  IForgotPasswordInput,
  IChangePasswordInput,
} from './../../@core/domain/dtos/ForgotPasswordDTO';
import { Controller, Post, Body, Param } from '@nestjs/common';

@Controller('forgot')
export class ForgotPasswordController {
  constructor(
    private readonly forgotPasswordUseCase: ForgotPasswordUseCase,
    private readonly changeForgotPasswordUseCase: ChangeForgotPasswordUseCase,
  ) {}

  @Post()
  async create(@Body() forgotpasswordDto: IForgotPasswordInput) {
    return await this.forgotPasswordUseCase.execute(forgotpasswordDto);
  }

  @Post('/:token')
  async update(
    @Param('token') token: string,
    @Body() changePassword: IChangePasswordInput,
  ) {
    return await this.changeForgotPasswordUseCase.execute(
      token,
      changePassword,
    );
  }
}
