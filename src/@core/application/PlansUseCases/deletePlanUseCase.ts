import { IPlansRepository } from "src/@core/domain/repositories/IPlansRepository";


export class DeletePlanUseCase {
  constructor(private planRepository: IPlansRepository) {}

  async execute(id: string): Promise<any> {
    await this.planRepository.delete(id);
    return { message: "Plan deleted successfully" };
  }
}