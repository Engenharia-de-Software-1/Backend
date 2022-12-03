import { IInvestorInput, IInvestorOutput } from '../dtos/InvestorDTO';

export type IInvestorRepository = {
  insert(investor: IInvestorInput): Promise<void>;
  findByUserId(
    id: string,
    returnNull?: boolean,
  ): Promise<IInvestorOutput | null>;
  update(id: string, data: IInvestorOutput): Promise<void>;
  view(id: string): Promise<void>;
  getViews(id: string): Promise<number>;
  delete(id: string): Promise<void>;
};
