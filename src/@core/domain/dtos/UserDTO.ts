import { IAddressOutput } from './AddressDTO';
import { IClientOutput } from './ClientDTO';
import { IInvestorOutput } from './InvestorDTO';

export interface IUserInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
}

export interface IUserOutput {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserOutputRelations {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  client: IClientOutput;
  investor: IInvestorOutput;
  address: IAddressOutput;
}
