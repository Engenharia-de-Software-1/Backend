import { IProjectOutputDTO } from '../../domain/dtos/ProjectDTO';
import { IProjectRepository } from '../../domain/repositories/IProjectRepository';

export class ListProjectsByUserUseCase {
  constructor(private projectRepository: IProjectRepository) {}

  public async execute(id: string): Promise<IProjectOutputDTO[]> {
    const project = await this.projectRepository.findByUserId(id);

    return project;
  }
}
