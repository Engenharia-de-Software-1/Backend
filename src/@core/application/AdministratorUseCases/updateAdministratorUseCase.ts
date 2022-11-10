import {
  IAdministratorOutput,
  IAdministratorUpdate,
} from '../../domain/dtos/AdministratorDTO';
import { Administrator } from '../../domain/entities/administrator.entity';
import { IAdminRepository } from '../../domain/repositories/IAdminRepository';
import { IHashRepository } from '../../domain/repositories/IHashRepository';

export class UpdateAdministratorUseCase {
  constructor(
    private adminRepository: IAdminRepository,
    private hashRepository: IHashRepository,
  ) {}

  public async execute(
    adminId: string,
    input: IAdministratorUpdate,
  ): Promise<IAdministratorOutput> {
    const admin = await this.adminRepository.findById(adminId);
    const forUpdate = Administrator.create(admin);

    if (input.password) {
      forUpdate.updatePassword(input.password);
      forUpdate.validatePassword();
      forUpdate.validateIfPasswordMatch(input.confirmPassword);
      const hashedPassword = await this.hashRepository.generateHash(
        input.password,
      );
      forUpdate.updatePassword(hashedPassword);
    }

    if (input.name) forUpdate.updateName(input.name);
    if (input.email) {
      forUpdate.updateEmail(input.email);
      forUpdate.validateEmail();
    }

    await this.adminRepository.update(adminId, forUpdate.toJson());
    const output = await this.adminRepository.findById(adminId);
    delete output.password;
    return output;
  }
}
