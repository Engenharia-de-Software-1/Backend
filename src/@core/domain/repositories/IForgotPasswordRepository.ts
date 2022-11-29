import { IForgotPasswordOutput } from './../dtos/ForgotPasswordDTO';

export type IForgotPasswordRepository = {
  insert(User: IForgotPasswordOutput): Promise<void>;
  findById(
    id: string,
    returnNull?: boolean,
  ): Promise<IForgotPasswordOutput | null>;
};
