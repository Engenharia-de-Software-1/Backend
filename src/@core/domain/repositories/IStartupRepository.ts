import { IStartupInput, IStartupOutput } from '../dtos/StartupDTO';

export type IStartupRepository = {
  insert(client: IStartupInput): Promise<void>;
  findByUserId(
    id: string,
    returnNull?: boolean,
  ): Promise<IStartupOutput | null>;
  update(id: string, data: IStartupOutput): Promise<void>;
  view(id: string): Promise<void>;
  getViews(id: string): Promise<number>;
  delete(id: string): Promise<void>;
};
