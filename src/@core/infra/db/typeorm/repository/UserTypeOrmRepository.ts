import { Repository } from 'typeorm';
import { IUserOutput } from '../../../../domain/dtos/UserDTO';
import { User } from '../../../../domain/entities/user.entity';
import { IUserRepository } from '../../../../domain/repositories/IUserRepository';

export class UserTypeOrmRepository implements IUserRepository {
  constructor(private ormRepo: Repository<User>) {}

  async insert(user: IUserOutput): Promise<void> {
    await this.ormRepo.save(user);
  }

  async findById(id: string, returnNull?: boolean): Promise<any | null> {
    const user = await this.ormRepo.findOne({ where: { id } });
    if (!user && !returnNull) {
      throw new Error('User not found');
    }
    return user;
  }
}
