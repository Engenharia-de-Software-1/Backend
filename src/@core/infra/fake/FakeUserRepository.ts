import { IUserOutput, IUserOutputRelations } from '../../domain/dtos/UserDTO';
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

  async findByIdWithRelations(id: string): Promise<IUserOutputRelations> {
    const user = this.users.find((user) => user.id === id);
    return user as IUserOutputRelations;
  }

  async findByEmail(
    email: string,
    returnNull?: boolean,
  ): Promise<IUserOutput | null> {
    const user = this.users.find((user) => user.email === email);
    if (!user && returnNull) {
      return null;
    } else if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  public async update(userId: string, input: IUserOutput): Promise<void> {
    const user = await this.findById(userId);
    user.name = input.name || user.name;
    user.email = input.email || user.email;
    user.password = input.password || user.password;
    user.phone = input.phone || user.phone;
    return;
  }

  public async delete(userId: string): Promise<void> {
    const user = await this.findById(userId);
    this.users.splice(this.users.indexOf(user), 1);
  }
}
