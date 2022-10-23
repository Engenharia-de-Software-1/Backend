import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Req,
} from '@nestjs/common';
import { User } from 'src/@core/domain/decorators/user.decorator';
import { CreateAdministratorUseCase } from '../../@core/application/createAdministratorUseCase';
import { DeleteAdministratorUseCase } from '../../@core/application/deleteAdministratorUseCase';
import { GetAdministratorUseCase } from '../../@core/application/getAdministratorUseCase';
import { UpdateAdministratorUseCase } from '../../@core/application/updateAdministratorUseCase';
import { IAdministratorInput } from '../../@core/domain/dtos/AdministratorDTO';
import { Request } from 'express';
@Controller('admin')
export class AdminController {
  constructor(
    private readonly createAdminUseCase: CreateAdministratorUseCase,
    private readonly getAdminUseCase: GetAdministratorUseCase,
    private readonly updateAdminUseCase: UpdateAdministratorUseCase,
    private readonly deleteAdminUseCase: DeleteAdministratorUseCase,
  ) {}

  @Post()
  async create(@Body() createAdminDto: IAdministratorInput) {
    return await this.createAdminUseCase.execute(createAdminDto);
  }

  @Get(':id')
  async getOne(@User() user: any, @Param('id') id: string) {
    return await this.getAdminUseCase.execute(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAdminDto: IAdministratorInput,
  ) {
    return await this.updateAdminUseCase.execute(id, updateAdminDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.deleteAdminUseCase.execute(id);
  }
}
