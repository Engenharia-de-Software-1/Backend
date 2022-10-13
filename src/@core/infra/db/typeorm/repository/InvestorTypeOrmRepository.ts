import { Repository } from 'typeorm';
import { IInvestorOutput } from '../../../../domain/dtos/InvestorDTO';
import { Investor } from '../../../../domain/entities/investor.entity';
import { IInvestorRepository } from '../../../../domain/repositories/IInvestorRepository';

export class InvestorTypeOrmRepository implements IInvestorRepository {
  constructor(private ormRepo: Repository<Investor>) {}

  async insert(investor: IInvestorOutput): Promise<void> {
    await this.ormRepo.save(investor);
  }

  async findByUserId(
    userId: string,
    returnNull?: boolean,
  ): Promise<IInvestorOutput | null> {
    const investor = await this.ormRepo.findOne({ where: { userId } });
    if (!investor && returnNull) {
      return null;
    } else if (!investor) {
      throw new Error('Investor not found');
    }
    return investor;
  }

  public async update(userId: string, input: IInvestorOutput): Promise<void> {
    const investor = await this.ormRepo.findOne({ where: { userId } });
    investor.companyName = input.companyName || investor.companyName;
    investor.cnpj = input.cnpj || investor.cnpj;
    investor.profession = input.profession || investor.profession;
    if (input.companyName || input.cnpj || input.profession)
      investor.updatedAt = new Date();

    await this.ormRepo.save(investor);
  }

  public async delete(userId: string): Promise<void> {
    const output = await this.findByUserId(userId);
    await this.ormRepo.delete({ id: output.id });
  }
}