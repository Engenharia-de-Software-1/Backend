import { IAdministratorOutput } from '../../domain/dtos/AdministratorDTO';
import { IAdminRepository } from '../../domain/repositories/IAdminRepository';

export class GetAdministratorUseCase {
  constructor(private adminRepository: IAdminRepository) {}

  public async execute(id: string): Promise<IAdministratorOutput> {
    const admin = await this.adminRepository.findById(id);

    delete admin.password;
    return admin;
  }
}
