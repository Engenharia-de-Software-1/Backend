import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateInvestorUseCase } from '../../@core/application/createInvestorUseCase';
import { DeleteInvestorUseCase } from '../../@core/application/deleteInvestorUseCase';
import { GetUserUseCase } from '../../@core/application/getUserUseCase';
import { UpdateInvestorUseCase } from '../../@core/application/updateInvestorUseCase';
import { ICreateInvestor } from '../../@core/domain/dtos/InvestorDTO';

@Controller('investor')
export class InvestorController {
  constructor(
    private readonly createInvestorUseCase: CreateInvestorUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly updateInvestorUseCase: UpdateInvestorUseCase,
    private readonly deleteInvestorUseCase: DeleteInvestorUseCase,
  ) {}

  @Post()
  async create(@Body() createInvestorDto: ICreateInvestor) {
    return await this.createInvestorUseCase.execute(createInvestorDto);
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.getUserUseCase.execute(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateInvestorDto: ICreateInvestor,
  ) {
    return await this.updateInvestorUseCase.execute(id, updateInvestorDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.deleteInvestorUseCase.execute(id);
  }
}
