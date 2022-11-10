import { IAdminRepository } from '../../domain/repositories/IAdminRepository';
import { FakeAdminRepository } from '../../infra/fake/FakeAdminRepository';
import { HashRepository } from '../../infra/HashRepository';
import { CreateAdministratorUseCase } from './createAdministratorUseCase';
import { UpdateAdministratorUseCase } from './updateAdministratorUseCase';

describe('Update Administrator Use Case Test', () => {
  let adminRepository: IAdminRepository;
  let hashRepository: HashRepository;
  let userId: string;

  beforeAll(async () => {
    adminRepository = new FakeAdminRepository();
    hashRepository = new HashRepository();
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

  it('should update an administrator', async () => {
    const useCase = new UpdateAdministratorUseCase(
      adminRepository,
      hashRepository,
    );
    const output = await useCase.execute(userId, {
      name: 'John Doe2',
      email: 'johndoe2@test.com.br',
    });
    expect(output).toEqual({
      id: expect.any(String),
      name: 'John Doe2',
      email: 'johndoe2@test.com.br',
    });
  });
});
