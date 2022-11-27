import { IPlansOutput } from "src/@core/domain/dtos/PlansDTO";
import { IPlansRepository } from "src/@core/domain/repositories/IPlansRepository";

export class GetPlanByIdUseCase{
    constructor(
        private plansRepository: IPlansRepository
    ){}

    async execute(id: string): Promise<IPlansOutput>{
        const plan = await this.plansRepository.findById(id);

        if(!plan){
            throw new Error('Plan not found');
        }

        return plan;
    }
}