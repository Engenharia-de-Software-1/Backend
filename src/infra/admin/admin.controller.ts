import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Req,
  BadRequestException,
  UnauthorizedException
} from '@nestjs/common';
import { Admin } from 'src/@core/domain/decorators/admin.decorator';
import { CreateAdministratorUseCase } from '../../@core/application/AdministratorUseCases/createAdministratorUseCase';
import { DeleteAdministratorUseCase } from '../../@core/application/AdministratorUseCases/deleteAdministratorUseCase';
import { GetAdministratorUseCase } from '../../@core/application/AdministratorUseCases/getAdministratorUseCase';
import { UpdateAdministratorUseCase } from '../../@core/application/AdministratorUseCases/updateAdministratorUseCase';
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

  @Get()
  async getOne(@Admin() admin: any ) {
    if (!admin) throw new UnauthorizedException('Not an admin');
    return await this.getAdminUseCase.execute(admin.id);
  }

  @Put()
  async update(
    @Admin() admin: any,
    @Body() updateAdminDto: IAdministratorInput,
  ) {
    if (!admin) throw new UnauthorizedException('Not an admin');
    return await this.updateAdminUseCase.execute(admin.id, updateAdminDto);
  }

  @Delete()
  async delete(@Admin() admin: any) {
    if (!admin) throw new UnauthorizedException('Not an admin');
    return await this.deleteAdminUseCase.execute(admin.id);
  }
}
