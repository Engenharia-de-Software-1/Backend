export type IAdministratorOutput = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type IAdministratorInput = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type IAdministratorUpdate = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};
