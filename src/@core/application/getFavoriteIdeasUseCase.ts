import { IIdeaOutput } from "../domain/dtos/IdeaDTO";
import { IIdeaFavoriteRepository } from "../domain/repositories/IIdeaRepository";


export class GetFavoriteIdeasUseCase {
    constructor(
        private ideaFavoriteRepository: IIdeaFavoriteRepository,
    ) {}

    async execute(userId: string): Promise<IIdeaOutput[]> {
        return await this.ideaFavoriteRepository.findAll(userId);;
    }
}