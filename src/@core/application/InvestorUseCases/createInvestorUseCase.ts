import { ICreateInvestor } from '../../domain/dtos/InvestorDTO';
import { IUserOutputRelations } from '../../domain/dtos/UserDTO';
import { Address } from '../../domain/entities/address.entity';
import { Investor } from '../../domain/entities/investor.entity';
import { User } from '../../domain/entities/user.entity';
import { IAddressRepository } from '../../domain/repositories/IAddressRepository';
import { IAdminRepository } from '../../domain/repositories/IAdminRepository';
import { IInvestorRepository } from '../../domain/repositories/IInvestorRepository';
import { IHashRepository } from '../../domain/repositories/IHashRepository';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { HttpException } from '@nestjs/common';
import { IPlansRepository } from './../../domain/repositories/IPlansRepository';

export class CreateInvestorUseCase {
  constructor(
    private investorRepository: IInvestorRepository,
    private userRepository: IUserRepository,
    private addressRepository: IAddressRepository,
    private hashRepository: IHashRepository,
    private adminRepository: IAdminRepository,
    private plansRepository: IPlansRepository,
  ) {}

  async execute(input: ICreateInvestor): Promise<IUserOutputRelations> {
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

    // ETAPA 2: CRIAR O IIVESTIDOR
    const investorInput = { ...input, userId: user.id };
    const investor = Investor.create(investorInput);

    // save Investor
    await this.investorRepository.insert(investor);

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
