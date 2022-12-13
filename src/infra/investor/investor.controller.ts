import { InvestorSetViewsUseCase } from './../../@core/application/InvestorUseCases/investorViewsUseCase';
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { User } from 'src/@core/domain/decorators/user.decorator';
import { IUserOutputRelations } from 'src/@core/domain/dtos/UserDTO';
import { CreateInvestorUseCase } from '../../@core/application/InvestorUseCases/createInvestorUseCase';
import { DeleteInvestorUseCase } from '../../@core/application/InvestorUseCases/deleteInvestorUseCase';
import { GetUserUseCase } from '../../@core/application/getUserUseCase';
import { UpdateInvestorUseCase } from '../../@core/application/InvestorUseCases/updateInvestorUseCase';
import { ICreateInvestor } from '../../@core/domain/dtos/InvestorDTO';
import { Admin } from 'src/@core/domain/decorators/admin.decorator';

@Controller('investor')
export class InvestorController {
  constructor(
    private readonly createInvestorUseCase: CreateInvestorUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly updateInvestorUseCase: UpdateInvestorUseCase,
    private readonly deleteInvestorUseCase: DeleteInvestorUseCase,
    private readonly setViewsUseCase: InvestorSetViewsUseCase,
  ) {}

  @Post()
  async create(@Body() createInvestorDto: ICreateInvestor) {
    return await this.createInvestorUseCase.execute(createInvestorDto);
  }

  @Get()
  async getOne(@User() user: IUserOutputRelations) {
    if (!user.investor) return;
    return await this.getUserUseCase.execute(user.id);
  }

  @Put()
  async update(
    @User() user: IUserOutputRelations,
    @Body() updateInvestorDto: ICreateInvestor,
  ) {
    if (!user.investor) return;
    return await this.updateInvestorUseCase.execute(user.id, updateInvestorDto);
  }

  @Delete()
  async delete(@User() user: IUserOutputRelations) {
    if (!user.investor) return;
    return await this.deleteInvestorUseCase.execute(user.id);
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
