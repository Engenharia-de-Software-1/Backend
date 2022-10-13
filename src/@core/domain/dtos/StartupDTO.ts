export interface IStartupInput {
  startupName?: string;
  cnpj?: string;
  employees?: number;
  userId: string;
}

export interface IStartupOutput {
  id?: string;
  startupName?: string;
  cnpj?: string;
  employees: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateStartup {
  startupName?: string;
  cnpj?: string;
  employees?: number;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  city: string;
  state: string;
}

export interface IStartupUpdate {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  phone?: string;
  startupName?: string;
  cnpj?: string;
  employees?: number;
  city?: string;
  state?: string;
}
