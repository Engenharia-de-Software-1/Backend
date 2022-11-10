import { IProjectOutputDTO } from '../../domain/dtos/ProjectDTO';
import { createUUID } from '../../domain/utils/createUUID';
import { FakeProjectRepository } from '../../infra/fake/FakeProjectRepository';
import { GetProjectUseCase } from './getProjectUseCse';

describe('Get Project Use Case', () => {
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

  it('should get a project', async () => {
    const fakeRepoRepository = new FakeProjectRepository();
    fakeRepoRepository.insert(projectProps);
    const getProjectUseCase = new GetProjectUseCase(fakeRepoRepository);
    const project = await getProjectUseCase.execute(id);
    expect(project).toStrictEqual(projectProps);
  });

  it('should throw an error if project not found', async () => {
    const fakeRepoRepository = new FakeProjectRepository();
    const getProjectUseCase = new GetProjectUseCase(fakeRepoRepository);
    expect(() => getProjectUseCase.execute('id_inexistente')).rejects.toThrow(
      'Project not found',
    );
  });
});
