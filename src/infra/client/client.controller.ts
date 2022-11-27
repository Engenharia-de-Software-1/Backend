import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { User } from 'src/@core/domain/decorators/user.decorator';
import { IUserOutputRelations } from 'src/@core/domain/dtos/UserDTO';
import { CreateClientUseCase } from '../../@core/application/ClientUseCases/createClientUseCase';
import { DeleteClientUseCase } from '../../@core/application/ClientUseCases/deleteClientUseCase';
import { GetUserUseCase } from '../../@core/application/getUserUseCase';
import { UpdateClientUseCase } from '../../@core/application/ClientUseCases/updateClientUseCase';
import { ICreateClient } from '../../@core/domain/dtos/ClientDTO';

@Controller('client')
export class ClientController {
  constructor(
    private readonly createClientUseCase: CreateClientUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly updateClientUseCase: UpdateClientUseCase,
    private readonly deleteClientUseCase: DeleteClientUseCase,
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
    console.log("foi")
    return await this.deleteClientUseCase.execute(user.id);
  }
}
