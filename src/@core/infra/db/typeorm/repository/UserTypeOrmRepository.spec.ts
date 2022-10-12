import { DataSource, Repository } from 'typeorm';
import { IUserInput } from '../../../../domain/dtos/UserDTO';
import { User } from '../../../../domain/entities/user.entity';
import { UserSchema } from '../schema/UserSchema';
import { UserTypeOrmRepository } from './UserTypeOrmRepository';

describe('UserTypeOrmRepository test', () => {
  let ormRepo: Repository<User>;
  let repository: UserTypeOrmRepository;

  beforeAll(async () => {
    const dataSource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      entities: [UserSchema],
    });
    await dataSource.initialize();
    ormRepo = dataSource.getRepository(User);
    repository = new UserTypeOrmRepository(ormRepo);
  });

  const userProps: IUserInput = {
    name: 'Yuri Baza',
    email: 'emailteste@teste.com.br',
    password: '12345678',
    confirmPassword: '12345678',
    phone: '11999999999',
  };
  const user = User.create(userProps);

  it('should insert a new user', async () => {
    await repository.insert(user);
    const userFromDb = await repository.findById(user.id);
    expect(userFromDb).toEqual(user);
  });

  // it('should find an admin by email', async () => {
  //   const adminFromDb = await repository.findByEmail(admin.email);
  //   expect(adminFromDb).toEqual(admin);
  // });

  // it('should find an admin by id', async () => {
  //   const adminFromDb = await repository.findById(admin.id);
  //   expect(adminFromDb).toEqual(admin);
  // });

  // it('should update an admin', async () => {
  //   admin.name = 'Yuri Baza 2';
  //   await repository.update(admin.id, admin);
  //   const adminFromDb = await repository.findById(admin.id);
  //   expect(adminFromDb).toEqual(admin);
  // });

  // it('should delete an admin', async () => {
  //   await repository.delete(admin.id);
  //   const adminFromDb = await repository.findById(admin.id, true);
  //   expect(adminFromDb).toBeNull();
  // });
});
