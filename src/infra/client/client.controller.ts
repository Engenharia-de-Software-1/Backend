import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/@core/domain/decorators/user.decorator';
import { IUserOutputRelations } from 'src/@core/domain/dtos/UserDTO';
import { CreateClientUseCase } from '../../@core/application/ClientUseCases/createClientUseCase';
import { DeleteClientUseCase } from '../../@core/application/ClientUseCases/deleteClientUseCase';
import { GetUserUseCase } from '../../@core/application/getUserUseCase';
import { UpdateClientUseCase } from '../../@core/application/ClientUseCases/updateClientUseCase';
import { ICreateClient } from '../../@core/domain/dtos/ClientDTO';
import { Admin } from 'src/@core/domain/decorators/admin.decorator';
import { ClientSetViewsUseCase } from 'src/@core/application/ClientUseCases/clientViewsUseCase';

@Controller('client')
export class ClientController {
  constructor(
    private readonly createClientUseCase: CreateClientUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly updateClientUseCase: UpdateClientUseCase,
    private readonly deleteClientUseCase: DeleteClientUseCase,
    private readonly setViewsUseCase: ClientSetViewsUseCase,
  ) {}

  @Post()
  async create(@Body() createClientDto: ICreateClient) {
    return await this.createClientUseCase.execute(createClientDto);
  }

  @Get()
  async getOne(@User() user: IUserOutputRelations) {
    if (!user.client) return;
    return await this.getUserUseCase.execute(user.id);
  }

  @Put(':id')
  async adminUpdateClient(
    @Admin() admin: any,
    @Body() updateClientDto: ICreateClient,
    @Param('id') id: string,
  ) {
    if (!admin) throw new UnauthorizedException('Not an admin');
    return await this.updateClientUseCase.execute(id, updateClientDto);
  }

  @Put()
  async update(
    @User() user: IUserOutputRelations,
    @Body() updateClientDto: ICreateClient,
  ) {
    if (!user.client) return;
    return await this.updateClientUseCase.execute(user.id, updateClientDto);
  }

  @Delete()
  async delete(@User() user: IUserOutputRelations) {
    if (!user.client) return;
    return await this.deleteClientUseCase.execute(user.id);
  }

  @Get(':id')
  async getUser(
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
