import { IClientOutput } from '../../domain/dtos/ClientDTO';
import { IClientRepository } from '../../domain/repositories/IClientRepository';

export class FakeClientRepository implements IClientRepository {
  public client: IClientOutput[] = [];

  async insert(user: IClientOutput): Promise<void> {
    this.client.push(user);
  }
}
