import { IAddressRepository } from '../../domain/repositories/IAddressRepository';
import { IInvestorRepository } from '../../domain/repositories/IInvestorRepository';
import { IUserRepository } from '../../domain/repositories/IUserRepository';

export class DeleteInvestorUseCase {
  constructor(
    private userRepository: IUserRepository,
    private investorRepository: IInvestorRepository,
    private addressRepository: IAddressRepository,
  ) {}

  async execute(userId: string): Promise<void> {
    await this.userRepository.findById(userId);
    await this.investorRepository.findByUserId(userId);
    await this.addressRepository.findByUserId(userId);
    await this.addressRepository.delete(userId);
    await this.investorRepository.delete(userId);
    await this.userRepository.delete(userId);
  }
}
