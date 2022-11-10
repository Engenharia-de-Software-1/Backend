import { IAdminRepository } from '../../domain/repositories/IAdminRepository';

export class DeleteAdministratorUseCase {
  constructor(private adminRepository: IAdminRepository) {}

  async execute(adminId: string): Promise<void> {
    await this.adminRepository.findById(adminId);
    await this.adminRepository.delete(adminId);
  }
}
