import { IAdminRepository } from '../../domain/repositories/IAdminRepository';
import { FakeAdminRepository } from '../../infra/fake/FakeAdminRepository';
import { HashRepository } from '../../infra/HashRepository';
import { CreateAdministratorUseCase } from './createAdministratorUseCase';
import { GetAdministratorUseCase } from './getAdministratorUseCase';

describe('Get Administrator Use Case Test', () => {
  let adminRepository: IAdminRepository;
  let userId: string;

  beforeAll(async () => {
    adminRepository = new FakeAdminRepository();
    const hashRepository = new HashRepository();
    const createAdministratorUseCase = new CreateAdministratorUseCase(
      hashRepository,
      adminRepository,
    );
    const userCreated = await createAdministratorUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '12345678',
      confirmPassword: '12345678',
    });
    userId = userCreated.id;
  });

  it('should get an administrator', async () => {
    const useCase = new GetAdministratorUseCase(adminRepository);
    const output = await useCase.execute(userId);
    expect(output).toEqual({
      id: expect.any(String),
      name: 'John Doe',
      email: 'johndoe@test.com',
    });
  });

  it("shouldn't get an administrator", async () => {
    const useCase = new GetAdministratorUseCase(adminRepository);
    expect(async () => await useCase.execute('')).rejects.toThrowError(
      'Admin not found',
    );
  });
});
