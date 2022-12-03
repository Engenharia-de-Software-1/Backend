import { HttpException } from "@nestjs/common";
import { IIdeaRepository } from "src/@core/domain/repositories/IIdeaRepository";

export class IdeaSetViewsUseCase {
  constructor(private ideaRepository: IIdeaRepository) {}

  async execute(id: string): Promise<void> {
    const idea = await this.ideaRepository.findById(id, true);
    if (!idea) throw new HttpException("Idea not found", 400);

    this.ideaRepository.view(idea.id);
  }
}