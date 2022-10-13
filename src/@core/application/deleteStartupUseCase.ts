import { IAddressRepository } from '../domain/repositories/IAddressRepository';
import { IStartupRepository } from '../domain/repositories/IStartupRepository';
import { IUserRepository } from '../domain/repositories/IUserRepository';

export class DeleteStartupUseCase {
  constructor(
    private userRepository: IUserRepository,
    private startupRepository: IStartupRepository,
    private addressRepository: IAddressRepository,
  ) {}

  async execute(userId: string): Promise<void> {
    await this.userRepository.findById(userId);
    await this.startupRepository.findByUserId(userId);
    await this.addressRepository.findByUserId(userId);
    await this.addressRepository.delete(userId);
    await this.startupRepository.delete(userId);
    await this.userRepository.delete(userId);
  }
}
