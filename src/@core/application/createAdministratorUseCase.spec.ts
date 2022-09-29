import { IAdministratorInput } from '../domain/dtos/AdministratorDTO';
import { CreateAdministratorUseCase } from './createAdministratorUseCase';

describe('Create Administrator Use Case test', () => {
  const input: IAdministratorInput = {
    name: 'John Doe',
    email: 'johndoe@test.com',
    password: '12345678',
    confirmPassword: '12345678',
  };

  it('should create a valid administrator', async () => {
    const useCase = new CreateAdministratorUseCase();
    const output = await useCase.execute(input);
    expect(output).toEqual({
      id: expect.any(String),
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '12345678',
    });
  });

  it("shouldn't create a valid administrator", async () => {
    const useCase = new CreateAdministratorUseCase();
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
});
