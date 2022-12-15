import { Admin } from './../../@core/domain/decorators/admin.decorator';
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  UnauthorizedException,
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

@Controller('startup')
export class StartupController {
  constructor(
    private readonly createStartupUseCase: CreateStartupUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly updateStartupUseCase: UpdateStartupUseCase,
    private readonly deleteStartupUseCase: DeleteStartupUseCase,
    private readonly startupSetViewsUseCase: StartupSetViewsUseCase,
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

  @Put(':id')
  async adminUpdateStartup(
    @Admin() admin: any,
    @Body() updateStartupDto: IStartupUpdate,
    @Param('id') id: string,
  ) {
    if (!admin) throw new UnauthorizedException('Not an admin');
    return await this.updateStartupUseCase.execute(id, updateStartupDto);
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
  async getOneById(@Param('id') id: string) {
    await this.startupSetViewsUseCase.execute(id);
    return await this.getUserUseCase.execute(id);
  }
}
