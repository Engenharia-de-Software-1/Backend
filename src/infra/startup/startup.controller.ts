import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
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
import { StartupSetViewsUseCase } from 'src/@core/application/StartupUseCases/startupViewsUseCase';
import { Admin } from 'src/@core/domain/decorators/admin.decorator';

@Controller('startup')
export class StartupController {
  constructor(
    private readonly createStartupUseCase: CreateStartupUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly updateStartupUseCase: UpdateStartupUseCase,
    private readonly deleteStartupUseCase: DeleteStartupUseCase,
    private readonly setViewsUseCase: StartupSetViewsUseCase,
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

  @Get(':id')
  async getOneById(
    @Admin() admin: any,
    @User() user: IUserOutputRelations,
    @Param('id') id: string,
  ) {
    const output = await this.getUserUseCase.execute(id);
    if (!admin && user.id !== id) {
      await this.setViewsUseCase.execute(id);
    }
    return output;
  }
}
