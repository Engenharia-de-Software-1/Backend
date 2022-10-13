import { IInvestorOutput } from '../../domain/dtos/InvestorDTO';
import { IInvestorRepository } from '../../domain/repositories/IInvestorRepository';

export class FakeInvestorRepository implements IInvestorRepository {
  public investor: IInvestorOutput[] = [];

  async insert(investor: IInvestorOutput): Promise<void> {
    this.investor.push(investor);
  }

  public async update(id: string, input: IInvestorOutput): Promise<void> {
    const investor = await this.findByUserId(id);
    investor.companyName = input.companyName || investor.companyName;
    investor.cnpj = input.cnpj || investor.cnpj;
    investor.profession = input.profession || investor.profession;
    if (input.companyName || input.cnpj || input.profession)
      investor.updatedAt = new Date();
    return;
  }

  public async findByUserId(
    id: string,
    returnNull?: boolean,
  ): Promise<IInvestorOutput | null> {
    const investor = this.investor.find((investor) => investor.userId === id);
    if (!investor && returnNull) {
      return null;
    } else if (!investor) {
      throw new Error('Investor not found');
    }
    return investor;
  }

  public async delete(userId: string): Promise<void> {
    const investor = await this.findByUserId(userId);
    this.investor.splice(this.investor.indexOf(investor), 1);
  }
}
