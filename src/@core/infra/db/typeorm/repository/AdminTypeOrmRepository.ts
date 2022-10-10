import { Repository } from 'typeorm';
import { IAdministratorOutput } from '../../../../domain/dtos/AdministratorDTO';
import { Administrator } from '../../../../domain/entities/administrator.entity';
import { IAdminRepository } from '../../../../domain/repositories/IAdminRepository';

export class AdminTypeOrmRepository implements IAdminRepository {
  constructor(private ormRepo: Repository<Administrator>) {}

  async insert(admin: IAdministratorOutput): Promise<void> {
    await this.ormRepo.save(admin);
  }

  async findByEmail(
    email: string,
    returnNull?: boolean,
  ): Promise<IAdministratorOutput | null> {
    const admin = await this.ormRepo.findOne({ where: { email } });
    if (!admin && returnNull) {
      return null;
    } else if (!admin) {
      throw new Error('Admin not found');
    }
    return admin;
  }

  async findById(
    id: string,
    returnNull?: boolean,
  ): Promise<IAdministratorOutput | null> {
    const admin = await this.ormRepo.findOne({ where: { id } });
    if (!admin && returnNull) {
      return null;
    } else if (!admin) {
      throw new Error('Admin not found');
    }
    return admin;
  }

  public async update(
    adminId: string,
    input: IAdministratorOutput,
  ): Promise<void> {
    const admin = await this.findById(adminId);
    admin.name = input.name || admin.name;
    admin.email = input.email || admin.email;
    admin.password = input.password || admin.password;

    await this.insert(admin);
  }

  public async delete(adminId: string): Promise<void> {
    const admin = await this.findById(adminId);
    await this.ormRepo.delete({ id: admin.id });
  }
}
