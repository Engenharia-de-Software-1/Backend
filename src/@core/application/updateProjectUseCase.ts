import { IUserRepository } from '../domain/repositories/IUserRepository';
import { IProjectRepository } from '../domain/repositories/IProjectRepository';
import {
  IProjectOutputDTO,
  IUpdateProjectDTO,
} from '../domain/dtos/ProjectDTO';
import { Project } from '../domain/entities/project.entity';

export class UpdateProjectUseCase {
  constructor(
    private userRepository: IUserRepository,
    private projectRepository: IProjectRepository,
  ) {}

  public async execute(
    userId: string,
    projectId: string,
    input: IUpdateProjectDTO,
  ): Promise<IProjectOutputDTO> {
    await this.userRepository.findById(userId);
    const project = await this.projectRepository.findById(projectId);

    const projectForUpdate = Project.create(project);
    projectForUpdate.update(input);
    await this.projectRepository.update(projectId, projectForUpdate.toJson());

    // Return
    const output = await this.projectRepository.findById(projectId);
    return output;
  }
}
