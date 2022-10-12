import { IUserOutput } from '../dtos/UserDTO';

export type IUserRepository = {
  insert(User: IUserOutput): Promise<void>;
};
