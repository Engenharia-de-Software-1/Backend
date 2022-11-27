import { Plans } from './../../domain/entities/plans.entity';
import { IPlansOutput, IPlansUpdate } from "src/@core/domain/dtos/PlansDTO";
import { IPlansRepository } from "src/@core/domain/repositories/IPlansRepository";


export class UpdatePlanUseCase{
    constructor(
        private plansRepository: IPlansRepository
    ){}

    async execute(userId: string, planId: string, data: IPlansUpdate): Promise<IPlansOutput>{
        const plan = await this.plansRepository.findByUserId(userId);
        if(!plan) throw new Error("Client don't have plan!");
        if(plan.id !== planId) throw new Error('Client isnt the owner of the plan!');

        const forUpdatePlan = Plans.create(plan);

        if(data.plan) forUpdatePlan.updatePlan(data.plan);
        if(data.expirationDate) forUpdatePlan.updateExpirationDate(data.expirationDate);
        
        await this.plansRepository.update(planId, forUpdatePlan.toJson());
        return await this.plansRepository.findByUserId(userId);
    }
}