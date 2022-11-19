import { UpdatePlanUseCase } from './updatePlanUseCase';
import { Plans } from './../../domain/entities/plans.entity';
import { IPlansInput, IPlansOutput, IPlansUpdate } from "src/@core/domain/dtos/PlansDTO";
import { IPlansRepository } from "src/@core/domain/repositories/IPlansRepository";


export class CreatePlanUseCase{
    constructor(
        private plansRepository: IPlansRepository,
        private updatePlanUseCase: UpdatePlanUseCase
    ){}

    async execute(data: IPlansInput): Promise<IPlansOutput>{
        if(this.plansRepository.findByUserId(data.userId)){
            const plan = await this.plansRepository.findByUserId(data.userId);
            const today = new Date();
            const expirationDate = new Date(today.setDate(today.getDate() + 30));
            const planData : IPlansUpdate = {
                plan: data.plan,
                expirationDate: expirationDate
            }
            return this.updatePlanUseCase.execute(plan.userId, plan.id, planData);
        }

        const plan = Plans.create(data);
        await this.plansRepository.insert(plan);
        
        return plan;
    }
}