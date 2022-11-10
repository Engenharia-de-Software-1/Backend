import { GetListIdeaByUserUseCase } from '../../@core/application/IdeaUseCases/getListIdeaByUserUseCase';
import { GetListIdeaUseCase } from '../../@core/application/IdeaUseCases/getListIdeaUseCase';
import { IUserOutputRelations } from 'src/@core/domain/dtos/UserDTO';
import { CreateIdeaUseCase } from '../../@core/application/IdeaUseCases/createIdeaUseCase';
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { GetIdeaUseCase } from "src/@core/application/IdeaUseCases/getIdeaUseCase";
import { DeleteIdeaUseCase } from "src/@core/application/IdeaUseCases/deleteIdeaUseCase";
import { UpdateIdeaUseCase } from "src/@core/application/IdeaUseCases/updateIdeaUseCase";
import { ICreateIdea } from "src/@core/domain/dtos/IdeaDTO";
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
    ) {}

    @Post()
    async create(@User() user:IUserOutputRelations, @Body() createIdeaDto: ICreateIdea) {
        return await this.createIdeaUseCase.execute(user.id, createIdeaDto);
    }

    @Get(':id')
    async getOne(@User() user: IUserOutputRelations, @Param('id') ideaID: string) {
        return await this.getIdeaUseCase.execute(ideaID);
    }

    @Get('')
    async getAll() {
        return await this.GetListIdeaUseCase.execute();
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