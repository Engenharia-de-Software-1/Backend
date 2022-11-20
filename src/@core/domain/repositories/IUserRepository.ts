import { IUserOutput, IUserOutputRelations } from '../dtos/UserDTO';

export type IUserRepository = {
  insert(User: IUserOutput): Promise<void>;
  findByIdWithRelations(id: string): Promise<IUserOutputRelations>;
  findByEmail(email: string, returnNull?: boolean): Promise<IUserOutput | null>;
  findById(id: string, returnNull?: boolean): Promise<IUserOutput | null>;
  findAll(): Promise<IUserOutputRelations[] | null>;
  update(id: string, data: IUserOutput): Promise<void>;
  delete(id: string): Promise<void>;
};
