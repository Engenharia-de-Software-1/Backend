import { IPlansOutput } from "src/@core/domain/dtos/PlansDTO";
import { IPlansRepository } from "src/@core/domain/repositories/IPlansRepository";


export class GetPlanByUserIdUseCase {
  constructor(private planRepository: IPlansRepository) {}

  async execute(id: string): Promise<IPlansOutput> {
    const plan = await this.planRepository.findByUserId(id);
    return plan;
  }
}