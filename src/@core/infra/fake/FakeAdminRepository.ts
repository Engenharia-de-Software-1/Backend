import { IAdministratorOutput } from '../../domain/dtos/AdministratorDTO';
import { IAdminRepository } from '../../domain/repositories/IAdminRepository';

export class FakeAdminRepository implements IAdminRepository {
  public admins: IAdministratorOutput[] = [];

  async insert(admin: IAdministratorOutput): Promise<void> {
    this.admins.push(admin);
  }

  async findByEmail(
    email: string,
    returnNull?: boolean,
  ): Promise<IAdministratorOutput | null> {
    const admin = this.admins.find((admin) => admin.email === email);
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
    const admin = this.admins.find((admin) => admin.id === id);
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
  }

  public async delete(adminId: string): Promise<void> {
    const admin = await this.findById(adminId);
    this.admins.splice(this.admins.indexOf(admin), 1);
  }
}
