import { IAdministratorOutput } from '../dtos/AdministratorDTO';

export interface IAdminRepository {
  insert(admin: IAdministratorOutput): Promise<void>;
  findByEmail(
    email: string,
    returnNull?: boolean,
  ): Promise<IAdministratorOutput | null>;
  findById(
    id: string,
    returnNull?: boolean,
  ): Promise<IAdministratorOutput | null>;
  update(adminId: string, input: IAdministratorOutput): Promise<void>;
}
