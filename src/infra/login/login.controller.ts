import { ILoginInput } from './../../@core/domain/dtos/LoginDTO';
import { LoginUseCase } from './../../@core/application/loginUseCase';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('login')
export class LoginController {
  constructor(private readonly loginUserUseCase: LoginUseCase) {}

  @Post()
  async create(@Body() loginDto: ILoginInput) {
    return await this.loginUserUseCase.execute(loginDto);
  }
}
