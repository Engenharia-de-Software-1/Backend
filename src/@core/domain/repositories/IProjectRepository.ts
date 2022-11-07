import { IProjectOutputDTO } from '../dtos/ProjectDTO';

export type IProjectRepository = {
  insert(project: IProjectOutputDTO): Promise<void>;
  findById(id: string, returnNull?: boolean): Promise<IProjectOutputDTO | null>;
  findByUserId(
    id: string,
    returnNull?: boolean,
  ): Promise<IProjectOutputDTO[] | null>;
  update(id: string, data: IProjectOutputDTO): Promise<void>;
  delete(id: string): Promise<void>;
  list(): Promise<IProjectOutputDTO[]>;
};
