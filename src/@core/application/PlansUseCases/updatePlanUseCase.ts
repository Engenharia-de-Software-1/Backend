import { Plans } from './../../domain/entities/plans.entity';
import { IPlansOutput, IPlansUpdate } from "src/@core/domain/dtos/PlansDTO";
import { IPlansRepository } from "src/@core/domain/repositories/IPlansRepository";


export class UpdatePlanUseCase{
    constructor(
        private plansRepository: IPlansRepository
    ){}

    async execute(planId: string, data: IPlansUpdate): Promise<IPlansOutput>{
        const plan = await this.plansRepository.findById(planId);
        if(!plan) throw new Error("Plan not found");

        const forUpdatePlan = Plans.create(plan);

        if(data.plan) forUpdatePlan.updatePlan(data.plan);
        if(data.permissions) forUpdatePlan.updatePermissions(data.permissions);
        
        await this.plansRepository.update(planId, forUpdatePlan.toJson());
        return await this.plansRepository.findById(planId);
    }
}