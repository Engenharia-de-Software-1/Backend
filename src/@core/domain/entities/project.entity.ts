import { IUpdateProjectDTO } from '../dtos/ProjectDTO';
import { createUUID } from '../utils/createUUID';

type IProjectProps = {
  id?: string;
  title: string;
  problem: string;
  solution: string;
  userId: string;
  situation?: 'approved' | 'pending' | 'rejected';
  createdAt?: Date;
  updatedAt?: Date;
};

class Project {
  public readonly id: string;
  public title: Required<IProjectProps['title']>;
  public problem: Required<IProjectProps['problem']>;
  public solution: Required<IProjectProps['solution']>;
  public userId: Required<IProjectProps['userId']>;
  public situation: IProjectProps['situation'];
  public readonly createdAt: IProjectProps['createdAt'];
  public updatedAt: IProjectProps['updatedAt'];

  private constructor(props: IProjectProps, id?: string) {
    this.id = id || createUUID();

    if (!props) {
      this.title = null;
      this.problem = null;
      this.solution = null;
      this.userId = null;
      this.situation = null;
      this.createdAt = null;
      this.updatedAt = null;
      return;
    }

    this.title = props.title;
    this.problem = props.problem;
    this.solution = props.solution;
    this.userId = props.userId;
    this.situation = props.situation || 'pending';
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt || new Date();
  }

  static create(props: IProjectProps, id?: string): Project {
    return new Project(props, id);
  }

  public updateTitle(title: string): void {
    this.title = title;
  }

  public updateProblem(problem: string): void {
    this.problem = problem;
  }

  public updateSolution(solution: string): void {
    this.solution = solution;
  }

  public updateUpdatedAt(): void {
    this.updatedAt = new Date();
  }

  public updateSituation(situation: 'approved' | 'pending' | 'rejected'): void {
    this.situation = situation;
  }

  public update(input: IUpdateProjectDTO): void {
    input.title && this.updateTitle(input.title);
    input.problem && this.updateProblem(input.problem);
    input.solution && this.updateSolution(input.solution);
    input.situation && this.updateSituation(input.situation);
    if (input.title || input.problem || input.solution || input.situation) {
      this.updateUpdatedAt();
    }
  }

  public toJson(): IProjectProps {
    return {
      id: this.id,
      title: this.title,
      problem: this.problem,
      solution: this.solution,
      userId: this.userId,
      situation: this.situation,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export { Project };