import { IProjectOutputDTO } from '../../domain/dtos/ProjectDTO';
import { IProjectRepository } from '../../domain/repositories/IProjectRepository';

export class FakeProjectRepository implements IProjectRepository {
  public projects: IProjectOutputDTO[] = [];

  async insert(project: IProjectOutputDTO): Promise<void> {
    this.projects.push(project);
  }

  async findById(id: string, returnNull?: boolean): Promise<any | null> {
    const project = this.projects.find((project) => project.id === id);
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
    const project = this.projects.filter(
      (project) => project.userId === userId,
    );
    if (!project || (!project.length && returnNull)) {
      return null;
    } else if (!project || !project.length) {
      throw new Error('Project not found');
    }
    return project;
  }

  public async update(id: string, input: IProjectOutputDTO): Promise<void> {
    const project = this.projects.find((project) => project.id === id);
    Object.assign(project, { ...input, id });
  }

  public async view(id: string): Promise<void> {
    const project = this.projects.find((project) => project.id === id);
    project.viewsOnProject = project.viewsOnProject + 1;
  }

  public async getViews(id: string): Promise<number> {
    const project = this.projects.find((project) => project.id === id);
    return project.viewsOnProject;
  }

  public async delete(userId: string): Promise<void> {
    const project = await this.findById(userId);
    this.projects.splice(this.projects.indexOf(project), 1);
  }

  public async list(): Promise<IProjectOutputDTO[]> {
    return this.projects;
  }
}
