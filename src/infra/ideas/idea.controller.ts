import { FavoriteUnfavoriteIdeaUseCase } from './../../@core/application/favoriteUnfavoriteIdeaUseCase';
import { GetFavoriteIdeasUseCase } from '../../@core/application/getFavoriteIdeasUseCase';
import { GetListIdeaByUserUseCase } from '../../@core/application/getListIdeaByUserUseCase';
import { GetListIdeaUseCase } from './../../@core/application/getListIdeaUseCase';
import { IUserOutputRelations } from 'src/@core/domain/dtos/UserDTO';
import { CreateIdeaUseCase } from './../../@core/application/createIdeaUseCase';
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { GetIdeaUseCase } from "src/@core/application/getIdeaUseCase";
import { DeleteIdeaUseCase } from "src/@core/application/deleteIdeaUseCase";
import { UpdateIdeaUseCase } from "src/@core/application/updateIdeaUseCase";
import { ICreateIdea, IIdeaFavoriteInput } from "src/@core/domain/dtos/IdeaDTO";
import { User } from 'src/@core/domain/decorators/user.decorator';


@Controller('idea')
export class IdeaController {
    constructor(
        private readonly createIdeaUseCase: CreateIdeaUseCase,
        private readonly getIdeaUseCase: GetIdeaUseCase,
        private readonly GetListIdeaUseCase: GetListIdeaUseCase,
        private readonly GetListIdeaByClientUseCase: GetListIdeaByUserUseCase,
        private readonly updateIdeaUseCase: UpdateIdeaUseCase,
        private readonly deleteIdeaUseCase: DeleteIdeaUseCase,
        private readonly getFavoriteIdeasUseCase: GetFavoriteIdeasUseCase,
        private readonly favoriteUnfavoriteIdeaUseCase: FavoriteUnfavoriteIdeaUseCase,
    ) {}

    @Post()
    async create(@User() user:IUserOutputRelations, @Body() createIdeaDto: ICreateIdea) {
        return await this.createIdeaUseCase.execute(user.id, createIdeaDto);
    }

    
    @Get('')
    async getAll() {
        return await this.GetListIdeaUseCase.execute();
    }
    
    @Get('favorite')
    async getFavorites(@User() user: IUserOutputRelations) {
        if (!user.startup) return;
        return await this.getFavoriteIdeasUseCase.execute(user.id);
    }

    @Post('favorite')
    async favorite(@User() user: IUserOutputRelations, @Body() data: IIdeaFavoriteInput) {
        if (!user.startup) return;
        return await this.favoriteUnfavoriteIdeaUseCase.execute(user.id, data);
    }
    
    @Get(':id')
    async getOne(@User() user: IUserOutputRelations, @Param('id') ideaID: string) {
        return await this.getIdeaUseCase.execute(ideaID);
    }
    
    @Get('user/:userId')
    async getAllByClient(@Param('userId') userId: string) {
        return await this.GetListIdeaByClientUseCase.execute(userId);
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