import { IAdministratorOutput } from '../../domain/dtos/AdministratorDTO';
import { IStartupUpdate } from '../../domain/dtos/StartupDTO';
import { Address } from '../../domain/entities/address.entity';
import { Startup } from '../../domain/entities/startup.entity';
import { User } from '../../domain/entities/user.entity';
import { IAddressRepository } from '../../domain/repositories/IAddressRepository';
import { IStartupRepository } from '../../domain/repositories/IStartupRepository';
import { IHashRepository } from '../../domain/repositories/IHashRepository';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { HttpException } from '@nestjs/common';
import { IPlansRepository } from 'src/@core/domain/repositories/IPlansRepository';
import { IAdminRepository } from 'src/@core/domain/repositories/IAdminRepository';

export class UpdateStartupUseCase {
  constructor(
    private userRepository: IUserRepository,
    private startupRepository: IStartupRepository,
    private addressRepository: IAddressRepository,
    private hashRepository: IHashRepository,
    private plansRepository: IPlansRepository,
    private adminRepository: IAdminRepository,
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
      const findEmail = await this.adminRepository.findByEmail(
        input.email,
        true,
      );
      if (findEmail) throw new HttpException('Email already exists', 400);
      const findEmailII = await this.userRepository.findByEmail(
        input.email,
        true,
      );

      if (findEmailII && findEmailII.email !== input.email)
        throw new HttpException('Email already exists', 400);

      forUpdate.updateEmail(input.email);
      forUpdate.validateEmail();
    }

    if (input.planName) {
      if (input.planName) {
        const findPlan = await this.plansRepository.findByName(
          input.planName,
          true,
        );
        if (!findPlan && input.planName !== 'default')
          throw new HttpException('Plan not found', 400);
      }

      forUpdate.updatePlan(input.planName);
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
