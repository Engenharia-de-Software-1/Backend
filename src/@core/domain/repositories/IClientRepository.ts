import { IClientInput, IClientOutput } from '../dtos/ClientDTO';

export type IClientRepository = {
  insert(client: IClientInput): Promise<void>;
  findByUserId(id: string, returnNull?: boolean): Promise<IClientOutput | null>;
  update(id: string, data: IClientOutput): Promise<void>;
  delete(id: string): Promise<void>;
};
