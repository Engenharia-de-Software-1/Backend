import { IAdministratorInput } from '../domain/dtos/AdministratorDTO';
import { IAdminRepository } from '../domain/repositories/IAdminRepository';
import { IHashRepository } from '../domain/repositories/IHashRepository';
import { FakeAdminRepository } from '../infra/fake/FakeAdminRepository';
import { HashRepository } from '../infra/HashRepository';
import { CreateAdministratorUseCase } from './createAdministratorUseCase';
import { DeleteAdministratorUseCase } from './deleteAdministratorUseCase';

describe('Create Administrator Use Case test', () => {
  let hashRepository: IHashRepository;
  let adminRepository: IAdminRepository;
  const input: IAdministratorInput = {
    name: 'John Doe',
    email: 'johndoe@test.com',
    password: '12345678',
    confirmPassword: '12345678',
  };

  beforeAll(() => {
    hashRepository = new HashRepository();
    adminRepository = new FakeAdminRepository();
  });

  it('should delete administrator', async () => {
    const useCase = new CreateAdministratorUseCase(
      hashRepository,
      adminRepository,
    );
    const output = await useCase.execute(input);
    expect(output).toEqual({
      id: expect.any(String),
      name: 'John Doe',
      email: 'johndoe@test.com',
    });
    const deleteAdministratorUseCase = new DeleteAdministratorUseCase(
      adminRepository,
    );
    await deleteAdministratorUseCase.execute(output.id);
    expect(
      async () => await adminRepository.findById(output.id),
    ).rejects.toThrowError();
  });
});
