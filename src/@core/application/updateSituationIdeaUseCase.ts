import { type } from "os";
import { IIdeaOutput, IIdeaUpdate } from "../domain/dtos/IdeaDTO";
import { Idea } from "../domain/entities/idea.entity";
import { IIdeaRepository } from "../domain/repositories/IIdeaRepository";


export class UpdateSituationIdeaUseCase{
    constructor(
        private ideaRepository: IIdeaRepository,
    ){}

    public async execute(
        ideiaId: string,
        situation: string,
    ): Promise<IIdeaOutput> {
        const idea = await this.ideaRepository.findById(ideiaId);
        if(!idea) throw new Error('Invalid idea!');

        await this.ideaRepository.updateSituation(ideiaId, situation['situation']);
        return await this.ideaRepository.findById(ideiaId);
    }

}