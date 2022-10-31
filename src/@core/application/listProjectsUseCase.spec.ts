import { IProjectOutputDTO } from '../domain/dtos/ProjectDTO';
import { createUUID } from '../domain/utils/createUUID';
import { FakeProjectRepository } from '../infra/fake/FakeProjectRepository';
import { ListProjectsUseCase } from './listProjectsUseCase';

describe('List Projects Use Case', () => {
  const id = createUUID();
  const projectProps: IProjectOutputDTO = {
    id,
    problem: 'problem',
    solution: 'solution',
    title: 'title',
    userId: 'userId',
    createdAt: new Date(),
    updatedAt: new Date(),
    situation: 'pending',
  };

  it('should list projects', async () => {
    const fakeRepoRepository = new FakeProjectRepository();
    fakeRepoRepository.insert(projectProps);
    const getProjectUseCase = new ListProjectsUseCase(fakeRepoRepository);
    const project = await getProjectUseCase.execute();
    expect(project).toStrictEqual([projectProps]);
  });
});
