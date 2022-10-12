import { Repository } from 'typeorm';
import { IClientOutput } from '../../../../domain/dtos/ClientDTO';
import { Client } from '../../../../domain/entities/Client.entity';
import { IClientRepository } from '../../../../domain/repositories/IClientRepository';

export class ClientTypeOrmRepository implements IClientRepository {
  constructor(private ormRepo: Repository<Client>) {}

  async insert(client: IClientOutput): Promise<void> {
    await this.ormRepo.save(client);
  }
}
