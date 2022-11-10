import { IAddressRepository } from '../../domain/repositories/IAddressRepository';
import { IClientRepository } from '../../domain/repositories/IClientRepository';
import { IUserRepository } from '../../domain/repositories/IUserRepository';

export class DeleteClientUseCase {
  constructor(
    private userRepository: IUserRepository,
    private clientRepository: IClientRepository,
    private addressRepository: IAddressRepository,
  ) {}

  async execute(userId: string): Promise<void> {
    await this.userRepository.findById(userId);
    await this.clientRepository.findByUserId(userId);
    await this.addressRepository.findByUserId(userId);
    await this.addressRepository.delete(userId);
    await this.clientRepository.delete(userId);
    await this.userRepository.delete(userId);
  }
}
