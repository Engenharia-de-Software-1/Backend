import { IClientOutput } from '../../domain/dtos/ClientDTO';
import { IClientRepository } from '../../domain/repositories/IClientRepository';

export class FakeClientRepository implements IClientRepository {
  public client: IClientOutput[] = [];

  async insert(client: IClientOutput): Promise<void> {
    this.client.push(client);
  }

  public async update(id: string, input: IClientOutput): Promise<void> {
    const client = await this.findByUserId(id);
    client.companyName = input.companyName || client.companyName;
    client.cnpj = input.cnpj || client.cnpj;
    client.profession = input.profession || client.profession;
    if (input.companyName || input.cnpj || input.profession)
      client.updatedAt = new Date();
    return;
  }

  public async findByUserId(
    id: string,
    returnNull?: boolean,
  ): Promise<IClientOutput | null> {
    const client = this.client.find((client) => client.userId === id);
    if (!client && returnNull) {
      return null;
    } else if (!client) {
      throw new Error('Client not found');
    }
    return client;
  }

  public async delete(userId: string): Promise<void> {
    const client = await this.findByUserId(userId);
    this.client.splice(this.client.indexOf(client), 1);
  }
}
