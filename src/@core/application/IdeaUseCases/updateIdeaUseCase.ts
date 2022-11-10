import { IIdeaOutput, IIdeaUpdate } from "../../domain/dtos/IdeaDTO";
import { Idea } from "../../domain/entities/idea.entity";
import { IIdeaRepository } from "../../domain/repositories/IIdeaRepository";


export class UpdateIdeaUseCase{
    constructor(
        private ideaRepository: IIdeaRepository,
    ){}

    public async execute(
        userId: string,
        ideiaId: string,
        input: IIdeaUpdate,
    ): Promise<IIdeaOutput> {
        const idea = await this.ideaRepository.findById(ideiaId);

        if(!idea) throw new Error('Invalid idea!');
        if(idea.userId !== userId) throw new Error('Client isnt the owner of the idea!');
        
        const forUpdateIdea = Idea.create(idea);

        if(input.title) forUpdateIdea.updateTitle(input.title);
        if(input.description) forUpdateIdea.updateDescription(input.description);

        await this.ideaRepository.update(ideiaId, forUpdateIdea.toJson());
        return await this.ideaRepository.findById(ideiaId);
    }

}