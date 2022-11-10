import { IIdeaOutput } from "../../domain/dtos/IdeaDTO";
import { IIdeaRepository } from "../../domain/repositories/IIdeaRepository";


export class GetListIdeaUseCase {
  constructor(private ideaRepository: IIdeaRepository) {}

  async execute(): Promise<IIdeaOutput[]> {
    const ideas = await this.ideaRepository.findAll();
    return ideas;
  }
}