import { HttpException } from "@nestjs/common";
import { IStartupRepository } from "src/@core/domain/repositories/IStartupRepository";

export class StartupSetViewsUseCase {
  constructor(private startupRepository: IStartupRepository) {}

  async execute(userId: string): Promise<void> {
    const startup = await this.startupRepository.findByUserId(userId, true);
    if (!startup) throw new HttpException("Startup not found", 400);

    this.startupRepository.view(userId);
  }
}