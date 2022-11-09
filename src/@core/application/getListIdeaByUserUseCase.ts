import { IIdeaOutput } from "../domain/dtos/IdeaDTO";
import { IIdeaRepository } from "../domain/repositories/IIdeaRepository";
import { IUserRepository } from "../domain/repositories/IUserRepository";

export class GetListIdeaByUserUseCase {
  constructor(private ideaRepository: IIdeaRepository) {}

  async execute(userId: string): Promise<IIdeaOutput[]> {
    const ideas = await this.ideaRepository.findByUserId(userId);
    return ideas;
  }
}