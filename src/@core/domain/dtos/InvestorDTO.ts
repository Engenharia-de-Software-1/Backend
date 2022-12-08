export interface IInvestorInput {
  companyName?: string;
  cnpj?: string;
  qtdMembers?: number;
  profession: string;
  userId: string;
}

export interface IInvestorOutput {
  id?: string;
  companyName?: string;
  cnpj?: string;
  qtdMembers?: number;
  profession: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
  views: number;
}

export interface ICreateInvestor {
  companyName?: string;
  cnpj?: string;
  qtdMembers?: number;
  profession: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  planName?: string;
  phone: string;
  city: string;
  state: string;
}

export interface IInvestorUpdate {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  phone?: string;
  qtdMembers?: number;
  companyName?: string;
  cnpj?: string;
  profession?: string;
  city?: string;
  state?: string;
  planName?: string;
}
