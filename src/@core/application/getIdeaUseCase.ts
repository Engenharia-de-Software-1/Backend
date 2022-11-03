import { IIdeaRepository } from "../domain/repositories/IIdeaRepository";
import { IIdeaOutput } from '../domain/dtos/IdeaDTO';

export class GetIdeaUseCase{
    constructor(
        private ideaRepository: IIdeaRepository,
    ) {}
    
    async execute(ideaId: string): Promise<IIdeaOutput> {
        const idea = await this.ideaRepository.findById(ideaId);
        return idea;
    }
}