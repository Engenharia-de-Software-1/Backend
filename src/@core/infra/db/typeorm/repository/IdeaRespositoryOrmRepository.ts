import { Repository } from "typeorm";
import { IIdeaFavoriteInput, IIdeaOutput } from "src/@core/domain/dtos/IdeaDTO";
import { Idea, IdeaFavorite } from "src/@core/domain/entities/idea.entity";
import { IIdeaFavoriteRepository, IIdeaRepository } from "src/@core/domain/repositories/IIdeaRepository";

export class IdeaTypeOrmRepository implements IIdeaRepository {
  constructor(private ormRepo: Repository<Idea>) {}

  async insert(idea: IIdeaOutput): Promise<void> {
    await this.ormRepo.save(idea);
  }

  async findAll(): Promise<IIdeaOutput[] | null> {
    return await this.ormRepo.find();
  }

  async findById(id: string, returnNull?: boolean): Promise<IIdeaOutput | null> {
    const idea = await this.ormRepo.findOne({ where: { id } });
    if (!idea && returnNull) {
      return null;
    } else if (!idea) {
      throw new Error("Idea not found");
    }
    return idea;
  }

  async findByUserId(
    userId: string,
    returnNull?: boolean
  ): Promise<IIdeaOutput[] | null> {
    const idea = await this.ormRepo.find({ where: { userId } });
    if (!idea && returnNull) {
      return null;
    } else if (!idea) {
      throw new Error("Idea not found");
    }
    return idea;
  }

  async findByUserIdAndTitle(userId: string, title: string, returnNull?: boolean): Promise<IIdeaOutput> {
    const idea = await this.ormRepo.findOne({ where: { userId, title } });
    if (!idea && returnNull) {
      return null;
    } else if (!idea) {
      throw new Error("Idea not found");
    }
    return idea;
  }

  public async update(
    id: string,
    input: IIdeaOutput
  ): Promise<void> {
    const idea = await this.ormRepo.findOne({ where: { id } });
    idea.title = input.title || idea.title;
    idea.description = input.description || idea.description;
    if (input.title || input.description) idea.updatedAt = new Date();

    await this.ormRepo.save(idea);
  }

  public async updateSituation(id: string, situation: string): Promise<IIdeaOutput | null> {
    const idea = await this.ormRepo.findOne({ where: { id } });
    idea.situation = situation;
    await this.ormRepo.save(idea);
    return idea
  }

  public async delete(id: string): Promise<void> {
    const output = await this.findById(id);
    await this.ormRepo.delete({ id: output.id });
  }
}

export class IdeaFavoriteTypeOrmRepository implements IIdeaFavoriteRepository {
  constructor(private ormRepo: Repository<IdeaFavorite>, private ideaOrmRepo: Repository<Idea>) {}

  async insert(ideaFavorite: IIdeaFavoriteInput): Promise<void> {
    await this.ormRepo.save(ideaFavorite);
  }

  async findAll(userId: string): Promise<IIdeaOutput[] | null> {
    const ideas = await this.ormRepo.find({ where: { userId } });

    const ideasId: any = ideas.map((idea) => {
      const { ideaId: id } = idea;
      return { id }
    });
    
    if(!ideasId.length) return [];

    return await this.ideaOrmRepo.find({ where: ideasId})
  }

  async isIdeaFavoritedByUser(userId: string, ideaId: string): Promise<boolean> {
    const ideaFavorite = await this.ormRepo.findOne({ where: { ideaId, userId }});
    return ideaFavorite ? true : false;    
  }
  

  async delete(ideaId: string, userId: string): Promise<void> {
    const output = await this.ormRepo.findOne({ where: { ideaId, userId } });
    await this.ormRepo.delete({ id: output.id });
  }
}

function In(ideasId: string[]): string | import("typeorm").FindOperator<string> {
  throw new Error("Function not implemented.");
}
