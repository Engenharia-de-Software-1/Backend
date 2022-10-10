import { DataSource, Repository } from 'typeorm';
import { IAdministratorInput } from '../../../../domain/dtos/AdministratorDTO';
import { Administrator } from '../../../../domain/entities/administrator.entity';
import { AdministratorSchema } from '../schema/AdministratorSchema';
import { AdminTypeOrmRepository } from './AdminTypeOrmRepository';

describe('AdminTypeOrmRepository test', () => {
  let ormRepo: Repository<Administrator>;
  let repository: AdminTypeOrmRepository;

  beforeAll(async () => {
    const dataSource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      entities: [AdministratorSchema],
    });
    await dataSource.initialize();
    ormRepo = dataSource.getRepository(Administrator);
    repository = new AdminTypeOrmRepository(ormRepo);
  });

  const adminProps: IAdministratorInput = {
    name: 'Yuri Baza',
    email: 'emailteste@teste.com.br',
    password: '12345678',
    confirmPassword: '12345678',
  };
  const admin = Administrator.create(adminProps);

  it('should insert a new admin', async () => {
    await repository.insert(admin);
    const adminFromDb = await repository.findById(admin.id);
    expect(adminFromDb).toEqual(admin);
  });

  it('should find an admin by email', async () => {
    const adminFromDb = await repository.findByEmail(admin.email);
    expect(adminFromDb).toEqual(admin);
  });

  it('should find an admin by id', async () => {
    const adminFromDb = await repository.findById(admin.id);
    expect(adminFromDb).toEqual(admin);
  });

  it('should update an admin', async () => {
    admin.name = 'Yuri Baza 2';
    await repository.update(admin.id, admin);
    const adminFromDb = await repository.findById(admin.id);
    expect(adminFromDb).toEqual(admin);
  });

  it('should delete an admin', async () => {
    await repository.delete(admin.id);
    const adminFromDb = await repository.findById(admin.id, true);
    expect(adminFromDb).toBeNull();
  });
});
