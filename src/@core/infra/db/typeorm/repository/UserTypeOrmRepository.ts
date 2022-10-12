import { Repository } from 'typeorm';
import {
  IUserOutput,
  IUserOutputRelations,
} from '../../../../domain/dtos/UserDTO';
import { Address } from '../../../../domain/entities/address.entity';
import { Client } from '../../../../domain/entities/client.entity';
import { User } from '../../../../domain/entities/user.entity';
import { IUserRepository } from '../../../../domain/repositories/IUserRepository';

export class UserTypeOrmRepository implements IUserRepository {
  constructor(
    private ormRepo: Repository<User>,
    private clientOrmRepo: Repository<Client>,
    private addressOrmRepo: Repository<Address>,
  ) {}

  async insert(user: IUserOutput): Promise<void> {
    await this.ormRepo.save(user);
  }

  async findByIdWithRelations(
    id: string,
  ): Promise<IUserOutputRelations | null> {
    const user = await this.ormRepo.findOne({ where: { id } });
    const client = await this.clientOrmRepo.findOne({ where: { userId: id } });
    const address = await this.addressOrmRepo.findOne({
      where: { userId: id },
    });
    const output = { ...user, client, address };
    return output;
  }

  async findByEmail(
    email: string,
    returnNull?: boolean,
  ): Promise<IUserOutput | null> {
    const user = await this.ormRepo.findOne({ where: { email } });
    if (!user && returnNull) {
      return null;
    } else if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async findById(
    id: string,
    returnNull?: boolean,
  ): Promise<IUserOutput | null> {
    const user = await this.ormRepo.findOne({ where: { id } });
    if (!user && returnNull) {
      return null;
    } else if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  public async update(userId: string, input: IUserOutput): Promise<void> {
    const user = await this.findById(userId);
    user.name = input.name || user.name;
    user.phone = input.phone || user.phone;
    user.email = input.email || user.email;
    user.password = input.password || user.password;
    if (input.name || input.phone || input.email || input.password)
      user.updatedAt = new Date();

    await this.insert(user);
  }

  public async delete(userId: string): Promise<void> {
    const output = await this.findById(userId);
    await this.ormRepo.delete({ id: output.id });
  }
}
