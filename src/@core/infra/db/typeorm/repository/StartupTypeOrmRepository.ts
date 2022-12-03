import { Repository } from 'typeorm';
import { IStartupOutput } from '../../../../domain/dtos/StartupDTO';
import { Startup } from '../../../../domain/entities/startup.entity';
import { IStartupRepository } from '../../../../domain/repositories/IStartupRepository';

export class StartupTypeOrmRepository implements IStartupRepository {
  constructor(private ormRepo: Repository<Startup>) {}

  async insert(startup: IStartupOutput): Promise<void> {
    await this.ormRepo.save(startup);
  }

  async findByUserId(
    userId: string,
    returnNull?: boolean,
  ): Promise<IStartupOutput | null> {
    const startup = await this.ormRepo.findOne({ where: { userId } });
    if (!startup && returnNull) {
      return null;
    } else if (!startup) {
      throw new Error('startup not found');
    }
    return startup;
  }

  public async update(userId: string, input: IStartupOutput): Promise<void> {
    const startup = await this.ormRepo.findOne({ where: { userId } });
    startup.startupName = input.startupName || startup.startupName;
    startup.cnpj = input.cnpj || startup.cnpj;
    startup.employees = input.employees || startup.employees;
    if (input.startupName || input.cnpj || input.employees)
      startup.updatedAt = new Date();
    await this.ormRepo.save(startup);
  }

  public async view(userId: string): Promise<void> {
    const startup = await this.ormRepo.findOne({ where: { userId } });
    startup.viewsOnProfile += 1;
    await this.ormRepo.save(startup);
  }

  public async getViews(userId: string): Promise<number> {
    const startup = await this.ormRepo.findOne({ where: { userId } });
    return startup.viewsOnProfile;
  }

  public async delete(userId: string): Promise<void> {
    const output = await this.findByUserId(userId);
    await this.ormRepo.delete({ id: output.id });
  }
}
