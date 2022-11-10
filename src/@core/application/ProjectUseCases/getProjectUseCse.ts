import { IProjectOutputDTO } from '../../domain/dtos/ProjectDTO';
import { IProjectRepository } from '../../domain/repositories/IProjectRepository';

export class GetProjectUseCase {
  constructor(private projectRepository: IProjectRepository) {}

  public async execute(id: string): Promise<IProjectOutputDTO> {
    const project = await this.projectRepository.findById(id);

    return project;
  }
}
