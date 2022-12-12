import { HttpException } from '@nestjs/common';
import { IClientRepository } from "src/@core/domain/repositories/IClientRepository";

export class ClientSetViewsUseCase {
  constructor(private clientRepository: IClientRepository) {}

  async execute(userId: string): Promise<void> {
    const client = await this.clientRepository.findByUserId(userId, true);
    if (!client) throw new HttpException("Client not found", 400);

    this.clientRepository.view(userId);
  }
}