import { Repository } from 'typeorm';
import { IClientOutput } from '../../../../domain/dtos/ClientDTO';
import { Client } from '../../../../domain/entities/Client.entity';
import { IClientRepository } from '../../../../domain/repositories/IClientRepository';

export class ClientTypeOrmRepository implements IClientRepository {
  constructor(private ormRepo: Repository<Client>) {}

  async insert(client: IClientOutput): Promise<void> {
    await this.ormRepo.save(client);
  }

  async findByUserId(
    userId: string,
    returnNull?: boolean,
  ): Promise<IClientOutput | null> {
    const client = await this.ormRepo.findOne({ where: { userId } });
    if (!client && returnNull) {
      return null;
    } else if (!client) {
      throw new Error('Client not found');
    }
    return client;
  }

  public async update(userId: string, input: IClientOutput): Promise<void> {
    const client = await this.ormRepo.findOne({ where: { userId } });
    client.companyName = input.companyName || client.companyName;
    client.cnpj = input.cnpj || client.cnpj;
    client.profession = input.profession || client.profession;
    if (input.companyName || input.cnpj || input.profession)
      client.updatedAt = new Date();

    await this.ormRepo.save(client);
  }

  public async delete(userId: string): Promise<void> {
    const output = await this.findByUserId(userId);
    await this.ormRepo.delete({ id: output.id });
  }
}
