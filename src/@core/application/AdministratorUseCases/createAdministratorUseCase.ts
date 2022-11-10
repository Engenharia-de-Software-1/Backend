import {
  IAdministratorInput,
  IAdministratorOutput,
} from '../../domain/dtos/AdministratorDTO';
import { Administrator } from '../../domain/entities/administrator.entity';
import { IAdminRepository } from '../../domain/repositories/IAdminRepository';
import { IHashRepository } from '../../domain/repositories/IHashRepository';

export class CreateAdministratorUseCase {
  constructor(
    private hashRepository: IHashRepository,
    private adminRepository: IAdminRepository,
  ) {}

  async execute(input: IAdministratorInput): Promise<IAdministratorOutput> {
    const admin = Administrator.create(input);
    admin.validateEmail();
    admin.validatePassword();
    admin.validateIfPasswordMatch(input.confirmPassword);

    const alreadyExist = await this.adminRepository.findByEmail(
      admin.email,
      true,
    );
    if (alreadyExist) throw new Error('Email already in use');

    const hashedPass = await this.hashRepository.generateHash(admin.password);
    admin.updatePassword(hashedPass);

    const output = admin.toJson();
    await this.adminRepository.insert(output);
    delete output.password;
    return output;
  }
}
