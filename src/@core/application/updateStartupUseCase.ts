import { IAdministratorOutput } from '../domain/dtos/AdministratorDTO';
import { IStartupUpdate } from '../domain/dtos/StartupDTO';
import { Address } from '../domain/entities/address.entity';
import { Startup } from '../domain/entities/startup.entity';
import { User } from '../domain/entities/user.entity';
import { IAddressRepository } from '../domain/repositories/IAddressRepository';
import { IStartupRepository } from '../domain/repositories/IstartupRepository';
import { IHashRepository } from '../domain/repositories/IHashRepository';
import { IUserRepository } from '../domain/repositories/IUserRepository';

export class UpdateStartupUseCase {
  constructor(
    private userRepository: IUserRepository,
    private startupRepository: IStartupRepository,
    private addressRepository: IAddressRepository,
    private hashRepository: IHashRepository,
  ) {}

  public async execute(
    userId: string,
    input: IStartupUpdate,
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

    // UPDATE Startup
    const startup = await this.startupRepository.findByUserId(userId);
    const startupForUpdate = Startup.create(startup);
    if (input.startupName)
      startupForUpdate.updateStartupName(input.startupName);
    if (input.cnpj) startupForUpdate.updateCnpj(input.cnpj);
    if (input.employees) startupForUpdate.updateEmployees(input.employees);

    await this.startupRepository.update(
      startup.userId,
      startupForUpdate.toJson(),
    );

    // UPDATE ADDRESS
    const address = await this.addressRepository.findByUserId(userId);
    const addressForUpdate = Address.create(address);

    if (input.city) addressForUpdate.updateCity(input.city);
    if (input.state) addressForUpdate.updateState(input.state);

    await this.addressRepository.update(
      address.userId,
      addressForUpdate.toJson(),
    );

    // Return
    const output = await this.userRepository.findByIdWithRelations(userId);
    delete output.password;
    return output;
  }
}
