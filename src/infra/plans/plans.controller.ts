import { GetAllPlansUseCase } from './../../@core/application/PlansUseCases/getAllPlansUseCase';
import { IPlansUpdate } from './../../@core/domain/dtos/PlansDTO';
import { CreatePlanUseCase } from './../../@core/application/PlansUseCases/createPlanUseCase';
import { Body, Controller, Delete, Get, Param, Post, Put, UnauthorizedException } from "@nestjs/common";
import { UpdatePlanUseCase } from 'src/@core/application/PlansUseCases/updatePlanUseCase';
import { DeletePlanUseCase } from 'src/@core/application/PlansUseCases/deletePlanUseCase';
import { GetPlanByUserIdUseCase } from 'src/@core/application/PlansUseCases/getPlanByUserIdUseCase';
import { IPlansInput } from 'src/@core/domain/dtos/PlansDTO';
import { IUserOutputRelations } from 'src/@core/domain/dtos/UserDTO';
import { User } from 'src/@core/domain/decorators/user.decorator';
import { Admin } from 'src/@core/domain/decorators/admin.decorator';

@Controller('plans')
export class PlansController {
    constructor(
        private readonly createPlanUseCase: CreatePlanUseCase,
        private readonly updatePlanUseCase: UpdatePlanUseCase,
        private readonly deletePlanUseCase: DeletePlanUseCase,
        private readonly getAllPlansUseCase: GetAllPlansUseCase,
        private readonly getPlanByUserIdUseCase: GetPlanByUserIdUseCase,
    ){}

    @Post()
    async create(@Body () data: IPlansInput){
        return await this.createPlanUseCase.execute(data);
    }

    @Delete()
    async delete(@Body ()   data: IPlansInput){
        return await this.deletePlanUseCase.execute(data.id);
    }

    @Get()
    async getAll(@Admin() admin: any){
        console.log("teste")
        if(!admin) throw new UnauthorizedException('Not an admin');
        return await this.getAllPlansUseCase.execute();
    }
    
    @Get('user')
    async getByUserId(@User() user: IUserOutputRelations){
        return await this.getPlanByUserIdUseCase.execute(user.id);
    }
    
    @Put('update/:planId')
    async update(
        @User () user: IUserOutputRelations,
        @Body () data: IPlansUpdate,
        @Param ('planId') planId: string
        ){
        return await this.updatePlanUseCase.execute(user.id, planId, data);
    }
}