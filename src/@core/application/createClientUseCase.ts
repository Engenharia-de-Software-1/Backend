import { ICreateClient } from '../domain/dtos/ClientDTO';
import { Address } from '../domain/entities/address.entity';
import { Client } from '../domain/entities/client.entity';
import { User } from '../domain/entities/user.entity';
import { IAddressRepository } from '../domain/repositories/IAddressRepository';
import { IClientRepository } from '../domain/repositories/IClientRepository';
import { IHashRepository } from '../domain/repositories/IHashRepository';
import { IUserRepository } from '../domain/repositories/IUserRepository';

export class CreateClientUseCase {
  constructor(
    private clientRepository: IClientRepository,
    private userRepository: IUserRepository,
    private addressRepository: IAddressRepository,
    private hashRepository: IHashRepository,
  ) {}

  async execute(input: ICreateClient): Promise<void> {
    // ETAPA 1: CRIAR O USUÁRIO
    const user = User.create(input);
    user.validateEmail();
    user.validatePassword();
    user.validateIfPasswordMatch(input.confirmPassword);

    // hash password
    const hashedPassword = await this.hashRepository.generateHash(
      user.password,
    );
    user.updatePassword(hashedPassword);

    // save user
    await this.userRepository.insert(user);

    // ETAPA 2: CRIAR O CLIENTE
    const clientInput = { ...input, userId: user.id };
    const client = Client.create(clientInput);

    // save client
    await this.clientRepository.insert(client);

    // ETAPA 3: CRIAR O ENDEREÇO
    const addressInput = { ...input, userId: user.id };
    const address = Address.create(addressInput);

    // save address
    await this.addressRepository.insert(address);
  }
}
