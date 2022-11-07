import { Repository } from 'typeorm';
import { IProjectOutputDTO } from '../../../../domain/dtos/ProjectDTO';
import { Project } from '../../../../domain/entities/project.entity';
import { IProjectRepository } from '../../../../domain/repositories/IProjectRepository';

export class ProjectTypeOrmRepository implements IProjectRepository {
  constructor(private ormRepo: Repository<Project>) {}

  async insert(project: IProjectOutputDTO): Promise<void> {
    await this.ormRepo.save(project);
  }

  async findById(
    id: string,
    returnNull?: boolean,
  ): Promise<IProjectOutputDTO | null> {
    const project = await this.ormRepo.findOne({ where: { id } });
    if (!project && returnNull) {
      return null;
    } else if (!project) {
      throw new Error('Project not found');
    }
    return project;
  }

  async findByUserId(
    userId: string,
    returnNull?: boolean,
  ): Promise<IProjectOutputDTO[] | null> {
    const project = await this.ormRepo.find({ where: { userId } });
    if (!project && returnNull) {
      return null;
    } else if (!project) {
      throw new Error('Project not found');
    }
    return project;
  }

  public async update(id: string, input: IProjectOutputDTO): Promise<void> {
    const project = await this.ormRepo.findOne({ where: { id } });
    project.problem = input.problem || project.problem;
    project.solution = input.solution || project.solution;
    project.situation = input.situation || project.situation;
    project.title = input.title || project.title;
    if (input.problem || input.solution || input.situation || input.title) {
      project.updatedAt = new Date();
    }
    await this.ormRepo.save(project);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepo.delete({ id: id });
  }

  public async list(): Promise<IProjectOutputDTO[]> {
    return await this.ormRepo.find();
  }
}
