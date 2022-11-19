import { IPlansOutput } from "src/@core/domain/dtos/PlansDTO";
import { IPlansRepository } from "src/@core/domain/repositories/IPlansRepository";


export class GetAllPlansUseCase {
  constructor(private planRepository: IPlansRepository) {}

  async execute(): Promise<IPlansOutput[] | null> {
    const plans = await this.planRepository.findAll();
    return plans;
  }
}