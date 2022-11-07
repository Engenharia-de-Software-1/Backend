import { Project } from './project.entity';

describe('Project Entity Test', () => {
  let newProject: Project;
  const props = {
    title: 'Project Title',
    problem: 'Project Problem',
    solution: 'Project Solution',
    userId: 'Any User Id',
  };

  beforeAll(() => {
    newProject = Project.create(props);
  });

  it('should create a valid project', () => {
    expect(newProject).toBeInstanceOf(Project);
    expect(newProject.toJson()).toEqual({
      id: expect.any(String),
      ...props,
      situation: 'pending',
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it('should update project title', () => {
    newProject.updateTitle('New Title');
    expect(newProject.title).toBe('New Title');
  });

  it('should update project problem', () => {
    newProject.updateProblem('New Problem');
    expect(newProject.problem).toBe('New Problem');
  });

  it('should update project solution', () => {
    newProject.updateSolution('New Solution');
    expect(newProject.solution).toBe('New Solution');
  });

  it('should update project using update method', () => {
    newProject.update({
      title: 'New Title 2',
      problem: 'New Problem 2',
      solution: 'New Solution 2',
    });
    expect(newProject.toJson()).toEqual({
      id: expect.any(String),
      title: 'New Title 2',
      problem: 'New Problem 2',
      solution: 'New Solution 2',
      userId: 'Any User Id',
      situation: 'pending',
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });

    expect(newProject.updatedAt).not.toBe(newProject.createdAt);
  });

  it('should update project situation', () => {
    newProject.updateSituation('approved');
    expect(newProject.situation).toBe('approved');
  });
});
