import { FakeAddressRepository } from '../../infra/fake/FakeAddressRepository';
import { FakeAdminRepository } from '../../infra/fake/FakeAdminRepository';
import { FakeClientRepository } from '../../infra/fake/FakeClientRepository';
import { FakeInvestorRepository } from '../../infra/fake/FakeInvestorRepository';
import { FakeProjectRepository } from '../../infra/fake/FakeProjectRepository';
import { FakeStartupRepository } from '../../infra/fake/FakeStartupRepository';
import { FakeUserRepository } from '../../infra/fake/FakeUserRepository';
import { HashRepository } from '../../infra/HashRepository';
import { CreateProjectUseCase } from './createProjectUseCase';
import { CreateStartupUseCase } from '../StartupUseCases/createStartupUseCase';
import { UpdateProjectUseCase } from './updateProjectUseCase';

describe('Update Project Use Case', () => {
  const projectRepo = new FakeProjectRepository();
  const startupRepo = new FakeStartupRepository();
  const addressRepo = new FakeAddressRepository();
  const clientRepo = new FakeClientRepository();
  const investorRepo = new FakeInvestorRepository();
  const userRepo = new FakeUserRepository(
    startupRepo,
    clientRepo,
    addressRepo,
    investorRepo,
  );
  const hashRepo = new HashRepository();
  const adminRepo = new FakeAdminRepository();
  let startupId = '';
  let projectId = '';

  beforeAll(async () => {
    const createStartupUseCase = new CreateStartupUseCase(
      startupRepo,
      userRepo,
      addressRepo,
      hashRepo,
      adminRepo,
    );

    const startup = await createStartupUseCase.execute({
      name: 'Startup Test',
      email: 'startup@teste.com',
      password: '12345678',
      confirmPassword: '12345678',
      city: 'São Paulo',
      state: 'São Paulo',
      phone: '11999999999',
      cnpj: '12345678901234',
      employees: 10,
      startupName: 'Startup Test',
    });
    startupId = startup.id;
    const createProjectUseCase = new CreateProjectUseCase(
      projectRepo,
      userRepo,
    );

    const project = await createProjectUseCase.execute({
      title: 'Project Test',
      problem: 'Problem Test',
      solution: 'Solution Test',
      userId: startupId,
    });
    projectId = project.id;
  });

  it('should update a project', async () => {
    const updateProjectUseCase = new UpdateProjectUseCase(
      userRepo,
      projectRepo,
    );
    await updateProjectUseCase.execute(startupId, projectId, {
      problem: 'New Problem',
    });
    const project = await projectRepo.findById(projectId);
    expect(project.problem).toBe('New Problem');
  });
});
