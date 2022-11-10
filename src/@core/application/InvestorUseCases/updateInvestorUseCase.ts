import { IAdministratorOutput } from '../../domain/dtos/AdministratorDTO';
import { IInvestorUpdate } from '../../domain/dtos/InvestorDTO';
import { Address } from '../../domain/entities/address.entity';
import { Investor } from '../../domain/entities/investor.entity';
import { User } from '../../domain/entities/user.entity';
import { IAddressRepository } from '../../domain/repositories/IAddressRepository';
import { IInvestorRepository } from '../../domain/repositories/IInvestorRepository';
import { IHashRepository } from '../../domain/repositories/IHashRepository';
import { IUserRepository } from '../../domain/repositories/IUserRepository';

export class UpdateInvestorUseCase {
  constructor(
    private userRepository: IUserRepository,
    private investorRepository: IInvestorRepository,
    private addressRepository: IAddressRepository,
    private hashRepository: IHashRepository,
  ) {}

  public async execute(
    userId: string,
    input: IInvestorUpdate,
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

    // UPDATE INVESTOR
    const investor = await this.investorRepository.findByUserId(userId);
    const investorForUpdate = Investor.create(investor);

    if (input.companyName)
      investorForUpdate.updateCompanyName(input.companyName);
    if (input.cnpj) investorForUpdate.updateCnpj(input.cnpj);
    if (input.profession) investorForUpdate.updateProfession(input.profession);
    if (input.qtdMembers) investorForUpdate.updateQtdMembers(input.qtdMembers);

    await this.investorRepository.update(user.id, investorForUpdate.toJson());

    // UPDATE ADDRESS
    const address = await this.addressRepository.findByUserId(userId);
    const addressForUpdate = Address.create(address);

    if (input.city) addressForUpdate.updateCity(input.city);
    if (input.state) addressForUpdate.updateState(input.state);

    await this.addressRepository.update(user.id, addressForUpdate.toJson());

    // Return
    const output = await this.userRepository.findByIdWithRelations(userId);
    delete output.password;
    return output;
  }
}
