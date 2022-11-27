import { UpdatePlanUseCase } from './updatePlanUseCase';
import { Plans } from './../../domain/entities/plans.entity';
import {
  IPlansInput,
  IPlansOutput,
  IPlansUpdate,
} from 'src/@core/domain/dtos/PlansDTO';
import { IPlansRepository } from 'src/@core/domain/repositories/IPlansRepository';

export class CreatePlanUseCase {
  constructor(
    private plansRepository: IPlansRepository,
    private updatePlanUseCase: UpdatePlanUseCase,
  ) {}

  async execute(data: IPlansInput): Promise<IPlansOutput> {
    const plan = Plans.create(data);
    await this.plansRepository.insert(plan);

    return plan;
  }
}
