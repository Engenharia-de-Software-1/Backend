import { GetListIdeaByUserUseCase } from '../../@core/application/IdeaUseCases/getListIdeaByUserUseCase';
import { GetListIdeaUseCase } from '../../@core/application/IdeaUseCases/getListIdeaUseCase';
import { UpdateSituationIdeaUseCase } from './../../@core/application/updateSituationIdeaUseCase';
import { FavoriteUnfavoriteIdeaUseCase } from './../../@core/application/favoriteUnfavoriteIdeaUseCase';
import { GetFavoriteIdeasUseCase } from '../../@core/application/getFavoriteIdeasUseCase';
import { IUserOutputRelations } from 'src/@core/domain/dtos/UserDTO';
import { CreateIdeaUseCase } from '../../@core/application/IdeaUseCases/createIdeaUseCase';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { GetIdeaUseCase } from 'src/@core/application/IdeaUseCases/getIdeaUseCase';
import { DeleteIdeaUseCase } from 'src/@core/application/IdeaUseCases/deleteIdeaUseCase';
import { UpdateIdeaUseCase } from 'src/@core/application/IdeaUseCases/updateIdeaUseCase';
import { ICreateIdea, IIdeaFavoriteInput } from 'src/@core/domain/dtos/IdeaDTO';
import { User } from 'src/@core/domain/decorators/user.decorator';
import { IdeaSetViewsUseCase } from 'src/@core/application/IdeaUseCases/ideaViewsUseCase';

@Controller('idea')
export class IdeaController {
  constructor(
    private readonly createIdeaUseCase: CreateIdeaUseCase,
    private readonly getIdeaUseCase: GetIdeaUseCase,
    private readonly getListIdeaUseCase: GetListIdeaUseCase,
    private readonly getListIdeaByClientUseCase: GetListIdeaByUserUseCase,
    private readonly updateIdeaUseCase: UpdateIdeaUseCase,
    private readonly updateSituationIdeaUseCase: UpdateSituationIdeaUseCase,
    private readonly deleteIdeaUseCase: DeleteIdeaUseCase,
    private readonly getFavoriteIdeasUseCase: GetFavoriteIdeasUseCase,
    private readonly favoriteUnfavoriteIdeaUseCase: FavoriteUnfavoriteIdeaUseCase,
    private readonly ideaSetViewsUseCase: IdeaSetViewsUseCase,
  ) {}

  @Post()
  async create(
    @User() user: IUserOutputRelations,
    @Body() createIdeaDto: ICreateIdea,
  ) {
    return await this.createIdeaUseCase.execute(user.id, createIdeaDto);
  }

  @Get('')
  async getAll() {
    return await this.getListIdeaUseCase.execute();
  }

  @Get('favorite')
  async getFavorites(@User() user: IUserOutputRelations) {
    return await this.getFavoriteIdeasUseCase.execute(user.id);
  }

  @Post('favorite')
  async favorite(
    @User() user: IUserOutputRelations,
    @Body() data: IIdeaFavoriteInput,
  ) {
    return await this.favoriteUnfavoriteIdeaUseCase.execute(user.id, data);
  }

  @Get(':id')
  async getOne(
    @User() user: IUserOutputRelations,
    @Param('id') ideaID: string,
  ) {
    await this.ideaSetViewsUseCase.execute(ideaID);
    return await this.getIdeaUseCase.execute(ideaID);
  }

  @Put('situation/:id')
  async updateSituation(
    @User() user: IUserOutputRelations,
    @Param('id') id: string,
    @Body() situation: string,
  ) {
    //TODO : Check if is admin
    return await this.updateSituationIdeaUseCase.execute(id, situation);
  }

  @Get('user/:userId')
  async getAllByClient(@Param('userId') userId: string) {
    return await this.getListIdeaByClientUseCase.execute(userId);
  }

  @Put(':id')
  async update(
    @User() user: IUserOutputRelations,
    @Body() updateIdeaDto: ICreateIdea,
    @Param('id') ideaID: string,
  ) {
    if (!user.client) return;
    return await this.updateIdeaUseCase.execute(user.id, ideaID, updateIdeaDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @User() user: IUserOutputRelations) {
    if (!user.client) return;
    return await this.deleteIdeaUseCase.execute(user.id, id);
  }
}
