import { Controller, Get, Post, Body, Put, Delete } from '@nestjs/common';
import { CreateStartupUseCase } from 'src/@core/application/StartupUseCases/createStartupUseCase';
import { UpdateStartupUseCase } from 'src/@core/application/StartupUseCases/updateStartupUseCase';
import { GetUserUseCase } from '../../@core/application/getUserUseCase';
import {
  ICreateStartup,
  IStartupUpdate,
} from 'src/@core/domain/dtos/StartupDTO';
import { DeleteStartupUseCase } from 'src/@core/application/StartupUseCases/deleteStartupUseCase';
import { User } from 'src/@core/domain/decorators/user.decorator';
import { IUserOutputRelations } from 'src/@core/domain/dtos/UserDTO';

@Controller('startup')
export class StartupController {
  constructor(
    private readonly createStartupUseCase: CreateStartupUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly updateStartupUseCase: UpdateStartupUseCase,
    private readonly deleteStartupUseCase: DeleteStartupUseCase,
  ) {}

  @Post()
  async create(@Body() createClientDto: ICreateStartup) {
    return await this.createStartupUseCase.execute(createClientDto);
  }

  @Get()
  async getOne(@User() user: IUserOutputRelations) {
    if (!user.startup) return;
    return await this.getUserUseCase.execute(user.id);
  }

  @Put()
  async update(
    @User() user: IUserOutputRelations,
    @Body() updateStartupDto: IStartupUpdate,
  ) {
    if (!user.startup) return;
    return await this.updateStartupUseCase.execute(user.id, updateStartupDto);
  }

  @Delete()
  async delete(@User() user: IUserOutputRelations) {
    if (!user.startup) return;
    return await this.deleteStartupUseCase.execute(user.id);
  }
}
