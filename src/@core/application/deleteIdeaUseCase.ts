import { IIdeaRepository } from '../domain/repositories/IIdeaRepository';

export class DeleteIdeaUseCase {
  constructor(
    private ideaRepository: IIdeaRepository,
  ) {}

  async execute(userId: string, ideaId: string): Promise<void> {
    const idea = await this.ideaRepository.findById(ideaId);
    if(idea.userId !== userId) throw new Error('Client doesnt own this idea!');
    await this.ideaRepository.delete(ideaId);
  }
}
