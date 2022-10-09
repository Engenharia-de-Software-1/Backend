import { IAdministratorInput } from '../domain/dtos/AdministratorDTO';
import { IAdminRepository } from '../domain/repositories/IAdminRepository';
import { IHashRepository } from '../domain/repositories/IHashRepository';
import { FakeAdminRepository } from '../infra/fake/FakeAdminRepository';
import { HashRepository } from '../infra/HashRepository';
import { CreateAdministratorUseCase } from './createAdministratorUseCase';

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

  it('should create a valid administrator', async () => {
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
  });

  it("shouldn't create a valid administrator", async () => {
    const useCase = new CreateAdministratorUseCase(
      hashRepository,
      adminRepository,
    );
    input.email = 'johndoe.com';
    expect(async () => await useCase.execute(input)).rejects.toThrowError(
      'Invalid email',
    );
    input.email = 'johndoe@test.com';
    input.password = '123';
    expect(async () => await useCase.execute(input)).rejects.toThrowError(
      'Invalid password',
    );
    input.password = '12345678';
    input.confirmPassword = '123456789';
    expect(async () => await useCase.execute(input)).rejects.toThrowError(
      'Invalid password',
    );
  });

  it("shouldn't create a valid administrator with email already in use", async () => {
    const useCase = new CreateAdministratorUseCase(
      hashRepository,
      adminRepository,
    );
    input.email = 'johndoe@test.com';
    input.confirmPassword = '12345678';
    expect(async () => await useCase.execute(input)).rejects.toThrowError(
      'Email already in use',
    );
  });
});
