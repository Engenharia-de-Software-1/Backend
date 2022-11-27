import { IUserOutputRelations } from './../domain/dtos/UserDTO';
import { IUserRepository } from "../domain/repositories/IUserRepository";


export class GetAllUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(): Promise<IUserOutputRelations[] | null> {
    const users = await this.userRepository.findAll();
    return users;
  }
}
