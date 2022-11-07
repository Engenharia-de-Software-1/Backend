import { IProjectInputDTO, IProjectOutputDTO } from '../domain/dtos/ProjectDTO';
import { Project } from '../domain/entities/project.entity';
import { IProjectRepository } from '../domain/repositories/IProjectRepository';
import { IUserRepository } from '../domain/repositories/IUserRepository';

export class CreateProjectUseCase {
  constructor(
    private projectRepository: IProjectRepository,
    private userRepository: IUserRepository,
  ) {}

  async execute(input: IProjectInputDTO): Promise<IProjectOutputDTO> {
    const userExists = await this.userRepository.findByIdWithRelations(
      input.userId,
    );
    if (!userExists.id) throw new Error('User not found');
    if (!userExists.startup) throw new Error('User is not a startup');

    const project = Project.create(input);

    await this.projectRepository.insert(project);
    const output = project.toJson();
    return output;
  }
}
