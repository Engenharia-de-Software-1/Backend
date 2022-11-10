import { FakeAddressRepository } from '../../infra/fake/FakeAddressRepository';
import { FakeAdminRepository } from '../../infra/fake/FakeAdminRepository';
import { FakeClientRepository } from '../../infra/fake/FakeClientRepository';
import { FakeInvestorRepository } from '../../infra/fake/FakeInvestorRepository';
import { FakeProjectRepository } from '../../infra/fake/FakeProjectRepository';
import { FakeStartupRepository } from '../../infra/fake/FakeStartupRepository';
import { FakeUserRepository } from '../../infra/fake/FakeUserRepository';
import { HashRepository } from '../../infra/HashRepository';
import { CreateClientUseCase } from '../ClientUseCases/createClientUseCase';
import { CreateProjectUseCase } from './createProjectUseCase';
import { CreateStartupUseCase } from '../StartupUseCases/createStartupUseCase';

describe('Create Project Use Case', () => {
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
  let clientId = '';

  beforeAll(async () => {
    const createStartupUseCase = new CreateStartupUseCase(
      startupRepo,
      userRepo,
      addressRepo,
      hashRepo,
      adminRepo,
    );

    const createUserUseCase = new CreateClientUseCase(
      clientRepo,
      userRepo,
      addressRepo,
      hashRepo,
      adminRepo,
    );

    const client = await createUserUseCase.execute({
      name: 'Client',
      email: 'client@teste.com',
      password: '12345678',
      confirmPassword: '12345678',
      city: 'São Paulo',
      state: 'São Paulo',
      phone: '11999999999',
      cnpj: '12345678901234',
      profession: 'Developer',
      companyName: 'Company',
    });

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
    clientId = client.id;
  });

  it('should create a project', async () => {
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
    expect(project).toHaveProperty('id');
  });

  it("sholdn't create a project with invalid user", async () => {
    const createProjectUseCase = new CreateProjectUseCase(
      projectRepo,
      userRepo,
    );
    expect(
      async () =>
        await createProjectUseCase.execute({
          title: 'Project Test',
          problem: 'Problem Test',
          solution: 'Solution Test',
          userId: '123',
        }),
    ).rejects.toThrow('User not found');
  });

  it("sholdn't create a project with invalid user", async () => {
    const createProjectUseCase = new CreateProjectUseCase(
      projectRepo,
      userRepo,
    );
    expect(
      async () =>
        await createProjectUseCase.execute({
          title: 'Project Test',
          problem: 'Problem Test',
          solution: 'Solution Test',
          userId: clientId,
        }),
    ).rejects.toThrow('User is not a startup');
  });
});
