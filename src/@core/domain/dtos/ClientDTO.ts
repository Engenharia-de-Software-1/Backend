export interface IClientInput {
  companyName?: string;
  cnpj?: string;
  profession: string;
  userId: string;
}

export interface IClientOutput {
  id: string;
  companyName?: string;
  cnpj?: string;
  profession: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateClient {
  companyName?: string;
  cnpj?: string;
  profession: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  city: string;
  state: string;
}

export interface IClientUpdate {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  phone?: string;
  companyName?: string;
  cnpj?: string;
  profession?: string;
  city?: string;
  state?: string;
}
