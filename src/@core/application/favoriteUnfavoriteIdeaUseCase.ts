import { IdeaFavorite } from 'src/@core/domain/entities/idea.entity';
import { IIdeaFavoriteInput } from "../domain/dtos/IdeaDTO";
import { IIdeaRepository, IIdeaFavoriteRepository } from "../domain/repositories/IIdeaRepository";


export class FavoriteUnfavoriteIdeaUseCase {
    private ideaRepository: IIdeaRepository;
    private ideaFavoriteRepository: IIdeaFavoriteRepository;

    constructor(ideaRepository: IIdeaRepository, ideaFavoriteRepository: IIdeaFavoriteRepository) {
        this.ideaRepository = ideaRepository;
        this.ideaFavoriteRepository = ideaFavoriteRepository;
    }

    async execute(userId: string, data: IIdeaFavoriteInput): Promise<any> {
        const idea = await this.ideaRepository.findById(data.ideaId);
        data.userId = userId;
        if (!idea) throw new Error('Idea not found');
        const isFavorite = await this.ideaFavoriteRepository.isIdeaFavoritedByUser(userId, idea.id);
        if(!isFavorite){
            const ideaFavorite = IdeaFavorite.create({ userId, ideaId: data.ideaId })
            return await this.ideaFavoriteRepository.insert(ideaFavorite)
        }
        return await this.ideaFavoriteRepository.delete(idea.id, userId);
    }
}