import { Module } from '@nestjs/common';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { CreateStartupUseCase } from 'src/@core/application/createStartupUseCase';
import { DataSource } from 'typeorm';
import { DeleteClientUseCase } from '../../@core/application/deleteClientUseCase';
import { GetUserUseCase } from '../../@core/application/getUserUseCase';
import { UpdateClientUseCase } from '../../@core/application/updateClientUseCase';
import { Address } from '../../@core/domain/entities/address.entity';
import { Administrator } from '../../@core/domain/entities/administrator.entity';
import { Startup } from '../../@core/domain/entities/startup.entity';
import { User } from '../../@core/domain/entities/user.entity';
import { Client } from '../../@core/domain/entities/client.entity';
import { Investor } from '../../@core/domain/entities/investor.entity';
import { IAddressRepository } from '../../@core/domain/repositories/IAddressRepository';
import { IAdminRepository } from '../../@core/domain/repositories/IAdminRepository';
import { IStartupRepository } from '../../@core/domain/repositories/IStartupRepository';
import { IHashRepository } from '../../@core/domain/repositories/IHashRepository';
import { IUserRepository } from '../../@core/domain/repositories/IUserRepository';
import { AddressTypeOrmRepository } from '../../@core/infra/db/typeorm/repository/AddressTypeOrmRepository';
import { AdminTypeOrmRepository } from '../../@core/infra/db/typeorm/repository/AdminTypeOrmRepository';
import { StartupTypeOrmRepository } from '../../@core/infra/db/typeorm/repository/StartupTypeOrmRepository';
import { UserTypeOrmRepository } from '../../@core/infra/db/typeorm/repository/UserTypeOrmRepository';
import { AdministratorSchema } from '../../@core/infra/db/typeorm/schema/AdministratorSchema';
import { StartupSchema } from '../../@core/infra/db/typeorm/schema/StartupSchema';
import { UserSchema } from '../../@core/infra/db/typeorm/schema/UserSchema';
import { HashRepository } from '../../@core/infra/HashRepository';
import { StartupController } from './startup.controller';
import { UpdateStartupUseCase } from 'src/@core/application/updateStartupUseCase';
import { DeleteStartupUseCase } from 'src/@core/application/deleteStartupUseCase';

@Module({
  imports: [
    TypeOrmModule.forFeature([StartupSchema, AdministratorSchema, UserSchema]),
  ],
  controllers: [StartupController],
  providers: [
    {
      provide: StartupTypeOrmRepository,
      useFactory: (dataSource: DataSource) => {
        return new StartupTypeOrmRepository(dataSource.getRepository(Startup));
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: UserTypeOrmRepository,
      useFactory: (dataSource: DataSource) => {
        return new UserTypeOrmRepository(
          dataSource.getRepository(User),
          dataSource.getRepository(Client),
          dataSource.getRepository(Address),
          dataSource.getRepository(Investor),
          dataSource.getRepository(Startup),
        );
      },
      inject: [
        getDataSourceToken(),
        getDataSourceToken(),
        getDataSourceToken(),
        getDataSourceToken(),
        getDataSourceToken(),
      ],
    },
    {
      provide: AddressTypeOrmRepository,
      useFactory: (dataSource: DataSource) => {
        return new AddressTypeOrmRepository(dataSource.getRepository(Address));
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: AdminTypeOrmRepository,
      useFactory: (dataSource: DataSource) => {
        return new AdminTypeOrmRepository(
          dataSource.getRepository(Administrator),
        );
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: HashRepository,
      useClass: HashRepository,
    },
    {
      provide: CreateStartupUseCase,
      useFactory: (
        startupRepo: IStartupRepository,
        userRepo: IUserRepository,
        addressRepo: IAddressRepository,
        hashRepo: IHashRepository,
        admRepo: IAdminRepository,
      ) => {
        return new CreateStartupUseCase(
          startupRepo,
          userRepo,
          addressRepo,
          hashRepo,
          admRepo,
        );
      },
      inject: [
        StartupTypeOrmRepository,
        UserTypeOrmRepository,
        AddressTypeOrmRepository,
        HashRepository,
        AdminTypeOrmRepository,
      ],
    },
    {
      provide: GetUserUseCase,
      useFactory: (userRepo: IUserRepository) => {
        return new GetUserUseCase(userRepo);
      },
      inject: [UserTypeOrmRepository],
    },
    {
      provide: UpdateStartupUseCase,
      useFactory: (
        userRepo: IUserRepository,
        startupRepo: IStartupRepository,
        addressRepo: IAddressRepository,
        hashRepo: IHashRepository,
      ) => {
        return new UpdateStartupUseCase(
          userRepo,
          startupRepo,
          addressRepo,
          hashRepo,
        );
      },
      inject: [
        UserTypeOrmRepository,
        StartupTypeOrmRepository,
        AddressTypeOrmRepository,
        HashRepository,
      ],
    },
    {
      provide: DeleteStartupUseCase,
      useFactory: (
        userRepo: IUserRepository,
        startupRepo: IStartupRepository,
        addressRepo: IAddressRepository,
      ) => {
        return new DeleteStartupUseCase(userRepo, startupRepo, addressRepo);
      },
      inject: [
        UserTypeOrmRepository,
        StartupTypeOrmRepository,
        AddressTypeOrmRepository,
      ],
    },
  ],
})
export class StartupModule {}