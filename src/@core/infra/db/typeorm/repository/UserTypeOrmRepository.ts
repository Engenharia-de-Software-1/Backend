import { Repository } from 'typeorm';
import {
  IUserOutput,
  IUserOutputRelations,
} from '../../../../domain/dtos/UserDTO';
import { Address } from '../../../../domain/entities/address.entity';
import { Client } from '../../../../domain/entities/client.entity';
import { Investor } from '../../../../domain/entities/investor.entity';
import { Startup } from '../../../../domain/entities/startup.entity';
import { User } from '../../../../domain/entities/user.entity';
import { IUserRepository } from '../../../../domain/repositories/IUserRepository';

export class UserTypeOrmRepository implements IUserRepository {
  constructor(
    private ormRepo: Repository<User>,
    private clientOrmRepo: Repository<Client>,
    private addressOrmRepo: Repository<Address>,
    private investorOrmRepo: Repository<Investor>,
    private startupOrmRepo: Repository<Startup>,
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
    const investor = await this.investorOrmRepo.findOne({
      where: { userId: id },
    });
    const startup = await this.startupOrmRepo.findOne({
      where: { userId: id },
    });
    const output = { ...user, client, address, investor, startup };
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

  async findAll(): Promise<IUserOutputRelations[] | null> {
    const users = await this.ormRepo.find();
    const usersWithRelations = await Promise.all(
      users.map(async (user) => {
        const client = await this.clientOrmRepo.findOne({
          where: { userId: user.id },
        });
        const address = await this.addressOrmRepo.findOne({
          where: { userId: user.id },
        });
        const investor = await this.investorOrmRepo.findOne({
          where: { userId: user.id },
        });
        const startup = await this.startupOrmRepo.findOne({
          where: { userId: user.id },
        });
        const output = { ...user, client, address, investor, startup };
        return output;
      }),
    );
    return usersWithRelations;
  }

  public async update(userId: string, input: IUserOutput): Promise<void> {
    const user = await this.findById(userId);
    user.name = input.name || user.name;
    user.phone = input.phone || user.phone;
    user.email = input.email || user.email;
    user.password = input.password || user.password;
    user.planName = input.planName || user.planName;
    user.planCreatedAt = input.planCreatedAt || user.planCreatedAt;
    user.planExpirationDate =
      input.planExpirationDate || user.planExpirationDate;
    if (input.name || input.phone || input.email || input.password)
      user.updatedAt = new Date();

    await this.insert(user);
  }

  public async delete(userId: string): Promise<void> {
    const output = await this.findById(userId);
    await this.ormRepo.delete({ id: output.id });
  }
}
