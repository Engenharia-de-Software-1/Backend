import { IProjectOutputDTO } from '../../domain/dtos/ProjectDTO';
import { Project } from '../../domain/entities/project.entity';
import { createUUID } from '../../domain/utils/createUUID';
import { FakeProjectRepository } from './FakeProjectRepository';

describe('Fake Project Repository Test', () => {
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

  it('should create a project', async () => {
    const fakeRepoRepository = new FakeProjectRepository();
    fakeRepoRepository.insert(projectProps);
    expect(fakeRepoRepository.projects).toStrictEqual([projectProps]);
  });

  it('should find a project by userId', async () => {
    const fakeRepoRepository = new FakeProjectRepository();
    fakeRepoRepository.insert(projectProps);
    const project = await fakeRepoRepository.findByUserId(projectProps.userId);
    expect(project).toStrictEqual([projectProps]);
  });

  it('should find a project by id', async () => {
    const fakeRepoRepository = new FakeProjectRepository();
    fakeRepoRepository.insert(projectProps);
    const project = await fakeRepoRepository.findById(id);
    expect(project).toStrictEqual(projectProps);
  });

  it('should return null if project not found by userId', async () => {
    const fakeRepoRepository = new FakeProjectRepository();
    const project = await fakeRepoRepository.findByUserId(
      'user_inexistente',
      true,
    );
    expect(project).toBeNull();
  });

  it('should return null if project not found by id', async () => {
    const fakeRepoRepository = new FakeProjectRepository();
    const project = await fakeRepoRepository.findById('id_inexistente', true);
    expect(project).toBeNull();
  });

  it('should throw an error if project not found by userId', async () => {
    const fakeRepoRepository = new FakeProjectRepository();
    expect(() =>
      fakeRepoRepository.findByUserId('user_inexistente'),
    ).rejects.toThrow('Project not found');
  });

  it('should throw an error if project not found by id', async () => {
    const fakeRepoRepository = new FakeProjectRepository();
    expect(() => fakeRepoRepository.findById('id_inexistente')).rejects.toThrow(
      'Project not found',
    );
  });

  it('should delete a project', async () => {
    const fakeRepoRepository = new FakeProjectRepository();
    fakeRepoRepository.insert(projectProps);
    await fakeRepoRepository.delete(id);
    expect(fakeRepoRepository.projects).toStrictEqual([]);
  });

  it('should update a project', async () => {
    const fakeRepoRepository = new FakeProjectRepository();
    fakeRepoRepository.insert(projectProps);
    const project = Project.create(projectProps);
    project.update({ title: 'new title' });
    await fakeRepoRepository.update(id, project);
    expect(fakeRepoRepository.projects).toStrictEqual([
      {
        ...projectProps,
        title: 'new title',
      },
    ]);
  });

  it('should list all projects', async () => {
    const fakeRepoRepository = new FakeProjectRepository();
    fakeRepoRepository.insert(projectProps);
    const projects = await fakeRepoRepository.list();
    expect(projects).toStrictEqual([projectProps]);
  });
});
