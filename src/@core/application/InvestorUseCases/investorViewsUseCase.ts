import { HttpException } from "@nestjs/common";
import { IInvestorRepository } from "src/@core/domain/repositories/IInvestorRepository";

export class InvestorSetViewsUseCase {
  constructor(private investorRepository: IInvestorRepository) {}

  async execute(userId: string): Promise<void> {
    const investor = await this.investorRepository.findByUserId(userId, true);
    if (!investor) throw new HttpException("Investor not found", 400);

    this.investorRepository.view(userId);
  }
}