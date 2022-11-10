import { IProjectRepository } from '../../domain/repositories/IProjectRepository';
import { IUserRepository } from '../../domain/repositories/IUserRepository';

export class DeleteProjectUseCase {
  constructor(
    private userRepository: IUserRepository,
    private projectRepository: IProjectRepository,
  ) {}

  async execute(userId: string, id: string): Promise<void> {
    await this.userRepository.findById(userId);
    const res = await this.projectRepository.findById(id);
    if (res.userId === userId) await this.projectRepository.delete(id);
  }
}
