import { DataSource } from 'typeorm';
import { Administrator } from '../../../../domain/entities/administrator.entity';
import { AdministratorSchema } from './AdministratorSchema';

describe('Administrator Schema tests', () => {
  test('create', async () => {
    const dataSource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      logging: false,
      synchronize: true,
      entities: [AdministratorSchema],
    });
    await dataSource.initialize();
    const adm = Administrator.create({
      name: 'Yuri Baza',
      email: 'emailteste@teste.com.br',
      password: '12345678',
    });
    const admRepo = dataSource.getRepository(Administrator);
    await admRepo.save(adm);
    const admFromDb = await admRepo.findOne({ where: { id: adm.id } });
    expect(admFromDb).toEqual(adm);
  });
});
