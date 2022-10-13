import { IInvestorInput, IInvestorOutput } from '../dtos/InvestorDTO';

export type IInvestorRepository = {
  insert(investor: IInvestorInput): Promise<void>;
  findByUserId(
    id: string,
    returnNull?: boolean,
  ): Promise<IInvestorOutput | null>;
  update(id: string, data: IInvestorOutput): Promise<void>;
  delete(id: string): Promise<void>;
};
