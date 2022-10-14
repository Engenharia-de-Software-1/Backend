import { IAdministratorOutput } from '../domain/dtos/AdministratorDTO';
import { IClientUpdate } from '../domain/dtos/ClientDTO';
import { Address } from '../domain/entities/address.entity';
import { Client } from '../domain/entities/client.entity';
import { User } from '../domain/entities/user.entity';
import { IAddressRepository } from '../domain/repositories/IAddressRepository';
import { IClientRepository } from '../domain/repositories/IClientRepository';
import { IHashRepository } from '../domain/repositories/IHashRepository';
import { IUserRepository } from '../domain/repositories/IUserRepository';

export class UpdateClientUseCase {
  constructor(
    private userRepository: IUserRepository,
    private clientRepository: IClientRepository,
    private addressRepository: IAddressRepository,
    private hashRepository: IHashRepository,
  ) {}

  public async execute(
    userId: string,
    input: IClientUpdate,
  ): Promise<IAdministratorOutput> {
    // UPDATE USER
    const user = await this.userRepository.findById(userId);
    const forUpdate = User.create(user);

    if (input.password) {
      forUpdate.updatePassword(input.password);
      forUpdate.validatePassword();
      forUpdate.validateIfPasswordMatch(input.confirmPassword);
      const hashedPassword = await this.hashRepository.generateHash(
        input.password,
      );
      forUpdate.updatePassword(hashedPassword);
    }

    if (input.name) forUpdate.updateName(input.name);
    if (input.phone) forUpdate.updatePhone(input.phone);
    if (input.email) {
      forUpdate.updateEmail(input.email);
      forUpdate.validateEmail();
    }

    await this.userRepository.update(userId, forUpdate.toJson());

    // UPDATE CLIENT
    const client = await this.clientRepository.findByUserId(userId);
    const clientForUpdate = Client.create(client);

    if (input.companyName) clientForUpdate.updateCompanyName(input.companyName);
    if (input.cnpj) clientForUpdate.updateCnpj(input.cnpj);
    if (input.profession) clientForUpdate.updateProfession(input.profession);

    // TODO: change to use entity id not user id
    await this.clientRepository.update(user.id, clientForUpdate.toJson());

    // UPDATE ADDRESS
    const address = await this.addressRepository.findByUserId(userId);
    const addressForUpdate = Address.create(address);

    if (input.city) addressForUpdate.updateCity(input.city);
    if (input.state) addressForUpdate.updateState(input.state);

    // TODO: change to use entity id not user id
    await this.addressRepository.update(user.id, addressForUpdate.toJson());

    // Return
    const output = await this.userRepository.findByIdWithRelations(userId);
    delete output.password;
    return output;
  }
}
