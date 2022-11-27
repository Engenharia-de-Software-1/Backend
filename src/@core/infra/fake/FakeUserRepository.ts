import { IUserOutput, IUserOutputRelations } from '../../domain/dtos/UserDTO';
import { IAddressRepository } from '../../domain/repositories/IAddressRepository';
import { IClientRepository } from '../../domain/repositories/IClientRepository';
import { IInvestorRepository } from '../../domain/repositories/IInvestorRepository';
import { IStartupRepository } from '../../domain/repositories/IStartupRepository';
import { IUserRepository } from '../../domain/repositories/IUserRepository';

export class FakeUserRepository implements IUserRepository {
  constructor(
    startupRepository: IStartupRepository,
    clientRepository: IClientRepository,
    addressRepository: IAddressRepository,
    investorRepository: IInvestorRepository,
  ) {
    this.startupRepository = startupRepository;
    this.clientRepository = clientRepository;
    this.addressRepository = addressRepository;
    this.investorRepository = investorRepository;
  }

  private clientRepository: IClientRepository;
  private investorRepository: IInvestorRepository;
  private addressRepository: IAddressRepository;
  private startupRepository: IStartupRepository;
  public users: IUserOutput[] = [];

  async insert(user: IUserOutput): Promise<void> {
    this.users.push(user);
  }

  async findById(id: string, returnNull?: boolean): Promise<any | null> {
    const user = this.users.find((user) => user.id === id);
    if (!user && !returnNull) {
      throw new Error('User not found');
    }
    return user;
  }

  async findByIdWithRelations(id: string): Promise<IUserOutputRelations> {
    const user = this.users.find((user) => user.id === id);
    const startup = await this.startupRepository.findByUserId(id, true);
    const client = await this.clientRepository.findByUserId(id, true);
    const address = await this.addressRepository.findByUserId(id, true);
    const investor = await this.investorRepository.findByUserId(id, true);
    const output: IUserOutputRelations = {
      ...user,
      startup,
      client,
      address,
      investor,
    };
    return output;
  }

  async findByEmail(
    email: string,
    returnNull?: boolean,
  ): Promise<IUserOutput | null> {
    const user = this.users.find((user) => user.email === email);
    if (!user && returnNull) {
      return null;
    } else if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  //TODO fix this
  async findAll(): Promise<IUserOutputRelations[] | null> {
    return null
  }

  public async update(userId: string, input: IUserOutput): Promise<void> {
    const user = await this.findById(userId);
    user.name = input.name || user.name;
    user.email = input.email || user.email;
    user.password = input.password || user.password;
    user.phone = input.phone || user.phone;
    return;
  }

  public async delete(userId: string): Promise<void> {
    const user = await this.findById(userId);
    this.users.splice(this.users.indexOf(user), 1);
  }
}
