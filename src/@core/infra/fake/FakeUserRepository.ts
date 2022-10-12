import { IUserOutput } from '../../domain/dtos/UserDTO';
import { IUserRepository } from '../../domain/repositories/IUserRepository';

export class FakeUserRepository implements IUserRepository {
  public users: IUserOutput[] = [];

  async insert(user: IUserOutput): Promise<void> {
    this.users.push(user);
  }

  async findById(id: string, returnNull?: boolean): Promise<any | null> {
    const user = this.users.find((user) => user.id === id);
    if (!user && !returnNull) {
      throw new Error('User not found');
    }
    return user;
  }
}
