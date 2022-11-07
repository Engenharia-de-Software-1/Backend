import { DataSource, Repository } from 'typeorm';
import { IUserInput } from '../../../../domain/dtos/UserDTO';
import { Address } from '../../../../domain/entities/address.entity';
import { Client } from '../../../../domain/entities/client.entity';
import { Investor } from '../../../../domain/entities/investor.entity';
import { Startup } from '../../../../domain/entities/startup.entity';
import { User } from '../../../../domain/entities/user.entity';
import { AddressSchema } from '../schema/AddressSchema';
import { ClientSchema } from '../schema/ClientSchema';
import { InvestorSchema } from '../schema/InvestorSchema';
import { StartupSchema } from '../schema/StartupSchema';
import { UserSchema } from '../schema/UserSchema';
import { UserTypeOrmRepository } from './UserTypeOrmRepository';

describe('UserTypeOrmRepository test', () => {
  let ormRepo: Repository<User>;
  let clientOrmRepo: Repository<Client>;
  let addressOrmRepo: Repository<Address>;
  let investorOrmRepo: Repository<Investor>;
  let startupOrmRepo: Repository<Startup>;
  let repository: UserTypeOrmRepository;

  beforeAll(async () => {
    const dataSource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      entities: [
        UserSchema,
        ClientSchema,
        AddressSchema,
        InvestorSchema,
        StartupSchema,
      ],
    });
    await dataSource.initialize();
    ormRepo = dataSource.getRepository(User);
    clientOrmRepo = dataSource.getRepository(Client);
    addressOrmRepo = dataSource.getRepository(Address);
    investorOrmRepo = dataSource.getRepository(Investor);
    startupOrmRepo = dataSource.getRepository(Startup);
    repository = new UserTypeOrmRepository(
      ormRepo,
      clientOrmRepo,
      addressOrmRepo,
      investorOrmRepo,
      startupOrmRepo,
    );
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
    const userFromDb = await repository.findByIdWithRelations(user.id);
    expect(userFromDb).toEqual({
      ...user,
      client: null,
      address: null,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      investor: null,
      startup: null,
    });
  });
});
