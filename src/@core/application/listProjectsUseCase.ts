import { IProjectOutputDTO } from '../domain/dtos/ProjectDTO';
import { IProjectRepository } from '../domain/repositories/IProjectRepository';

export class ListProjectsUseCase {
  constructor(private projectRepository: IProjectRepository) {}

  public async execute(): Promise<IProjectOutputDTO[]> {
    const projects = await this.projectRepository.list();

    return projects;
  }
}
