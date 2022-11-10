import { ICreateIdea, IIdeaOutput } from '../../domain/dtos/IdeaDTO';
import { Idea } from '../../domain/entities/idea.entity';
import { IClientRepository } from '../../domain/repositories/IClientRepository';
import { IIdeaRepository } from '../../domain/repositories/IIdeaRepository';


export class CreateIdeaUseCase {
  constructor(
    private clientRepository: IClientRepository,
    private ideaRepository: IIdeaRepository,
  ) {}

  async execute(userId: string, input: ICreateIdea): Promise<IIdeaOutput> {
    const client = await this.clientRepository.findByUserId(userId);
    if(!client) throw new Error('Invalid client!');
    
    // ETAPA 1: VERIFICAR SE IDEIA DO USUÁRIO JÁ EXISTE
    const findIdea = await this.ideaRepository.findByUserIdAndTitle(userId, input.title, true);
    if (findIdea) throw new Error('Idea already exists');
    
    // ETAPA 2: CRIAR A IDEIA
    const idea = Idea.create(input);
    idea.userId = userId;

    await this.ideaRepository.insert(idea);
    return await this.ideaRepository.findById(idea.id);
  }
}
