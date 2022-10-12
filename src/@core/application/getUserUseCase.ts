import { IUserOutputRelations } from '../domain/dtos/UserDTO';
import { IUserRepository } from '../domain/repositories/IUserRepository';

export class GetUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  public async execute(id: string): Promise<IUserOutputRelations> {
    const user = await this.userRepository.findByIdWithRelations(id);

    delete user.password;
    return user;
  }
}
