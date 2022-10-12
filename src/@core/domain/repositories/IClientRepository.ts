import { IClientInput } from '../dtos/ClientDTO';

export type IClientRepository = {
  insert(client: IClientInput): Promise<void>;
};
