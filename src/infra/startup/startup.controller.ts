import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateStartupUseCase } from 'src/@core/application/createStartupUseCase';
import { UpdateStartupUseCase } from 'src/@core/application/updateStartupUseCase';
import { GetUserUseCase } from '../../@core/application/getUserUseCase';
import { ICreateStartup } from 'src/@core/domain/dtos/StartupDTO';
import { DeleteStartupUseCase } from 'src/@core/application/deleteStartupUseCase';

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

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.getUserUseCase.execute(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStartupDto: ICreateStartup,
  ) {
    return await this.updateStartupUseCase.execute(id, updateStartupDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.deleteStartupUseCase.execute(id);
  }
}
