import { ICreateStartup } from '../../domain/dtos/StartupDTO';
import { IUserOutputRelations } from '../../domain/dtos/UserDTO';
import { Address } from '../../domain/entities/address.entity';
import { Startup } from '../../domain/entities/startup.entity';
import { User } from '../../domain/entities/user.entity';
import { IAddressRepository } from '../../domain/repositories/IAddressRepository';
import { IAdminRepository } from '../../domain/repositories/IAdminRepository';
import { IStartupRepository } from '../../domain/repositories/IStartupRepository';
import { IHashRepository } from '../../domain/repositories/IHashRepository';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { HttpException } from '@nestjs/common';
import { IPlansRepository } from 'src/@core/domain/repositories/IPlansRepository';

export class CreateStartupUseCase {
  constructor(
    private startupRepository: IStartupRepository,
    private userRepository: IUserRepository,
    private addressRepository: IAddressRepository,
    private hashRepository: IHashRepository,
    private adminRepository: IAdminRepository,
    private plansRepository: IPlansRepository,
  ) {}

  async execute(input: ICreateStartup): Promise<IUserOutputRelations> {
    // ETAPA 0: VERIFICAR SE USUÁRIO JA EXISTE
    const findEmail = await this.adminRepository.findByEmail(input.email, true);
    if (findEmail) throw new HttpException('Email already exists', 400);
    const findEmailII = await this.userRepository.findByEmail(
      input.email,
      true,
    );
    if (findEmailII) throw new HttpException('Email already exists', 400);
    // ETAPA 0.1: VERIFICAR SE PLANO EXISTE
    if (input.planName) {
      const findPlan = await this.plansRepository.findByName(input.planName, true);
      if (!findPlan) throw new HttpException('Plan not found', 400);
    }

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

    // ETAPA 2: Criar a startup
    const StartupInput = { ...input, userId: user.id };
    const startup = Startup.create(StartupInput);

    // save Startup
    await this.startupRepository.insert(startup);

    // ETAPA 3: CRIAR O ENDEREÇO
    const addressInput = { ...input, userId: user.id };
    const address = Address.create(addressInput);

    // save address
    await this.addressRepository.insert(address);

    const output = await this.userRepository.findByIdWithRelations(user.id);
    delete output.password;
    return output;
  }
}
