import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateClientUseCase } from '../../@core/application/createClientUseCase';
import { DeleteClientUseCase } from '../../@core/application/deleteClientUseCase';
import { GetUserUseCase } from '../../@core/application/getUserUseCase';
import { UpdateClientUseCase } from '../../@core/application/updateClientUseCase';
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

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.getUserUseCase.execute(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClientDto: ICreateClient,
  ) {
    return await this.updateClientUseCase.execute(id, updateClientDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.deleteClientUseCase.execute(id);
  }
}
