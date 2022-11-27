import { IAddressOutput } from './AddressDTO';
import { IClientOutput } from './ClientDTO';
import { IInvestorOutput } from './InvestorDTO';
import { IPlansOutput } from './PlansDTO';
import { IStartupOutput } from './StartupDTO';

export interface IUserInput {
  name: string;
  email: string;
  password: string;
  planId?: string;
  confirmPassword: string;
  phone: string;
}

export interface IUserOutput {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  planId: string;
  planCreatedAt: Date;
  planExpirationDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserOutputRelations {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  planId: string;
  planCreatedAt: Date;
  planExpirationDate: Date;
  createdAt: Date;
  updatedAt: Date;
  client: IClientOutput;
  investor: IInvestorOutput;
  address: IAddressOutput;
  startup: IStartupOutput;
}
