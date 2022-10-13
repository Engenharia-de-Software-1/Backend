import { IStartupInput, IStartupOutput } from '../dtos/StartupDTO';

export type IStartupRepository = {
  insert(client: IStartupInput): Promise<void>;
  findByUserId(
    id: string,
    returnNull?: boolean,
  ): Promise<IStartupOutput | null>;
  update(id: string, data: IStartupOutput): Promise<void>;
  delete(id: string): Promise<void>;
};
