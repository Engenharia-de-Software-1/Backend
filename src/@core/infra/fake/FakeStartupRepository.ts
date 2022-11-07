import { IStartupOutput } from '../../domain/dtos/StartupDTO';
import { IStartupRepository } from '../../domain/repositories/IStartupRepository';

export class FakeStartupRepository implements IStartupRepository {
  public startups: IStartupOutput[] = [];

  async insert(startup: IStartupOutput): Promise<void> {
    this.startups.push(startup);
  }

  async findByUserId(
    userId: string,
    returnNull?: boolean,
  ): Promise<IStartupOutput | null> {
    const startup = this.startups.find((startup) => startup.userId === userId);
    if (!startup && returnNull) {
      return null;
    } else if (!startup) {
      throw new Error('Startup not found');
    }
    return startup;
  }

  public async update(id: string, input: IStartupOutput): Promise<void> {
    const startup = this.startups.find((startup) => startup.id === id);
    Object.assign(startup, input);
  }

  public async delete(id: string): Promise<void> {
    const startup = this.startups.find((startup) => startup.id === id);
    this.startups.splice(this.startups.indexOf(startup), 1);
  }
}
