import { Module } from '@nestjs/common';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CreateClientUseCase } from '../../@core/application/createClientUseCase';
import { DeleteClientUseCase } from '../../@core/application/deleteClientUseCase';
import { GetUserUseCase } from '../../@core/application/getUserUseCase';
import { UpdateClientUseCase } from '../../@core/application/updateClientUseCase';
import { Address } from '../../@core/domain/entities/address.entity';
import { Administrator } from '../../@core/domain/entities/administrator.entity';
import { Client } from '../../@core/domain/entities/client.entity';
import { User } from '../../@core/domain/entities/user.entity';
import { IAddressRepository } from '../../@core/domain/repositories/IAddressRepository';
import { IAdminRepository } from '../../@core/domain/repositories/IAdminRepository';
import { IClientRepository } from '../../@core/domain/repositories/IClientRepository';
import { IHashRepository } from '../../@core/domain/repositories/IHashRepository';
import { IUserRepository } from '../../@core/domain/repositories/IUserRepository';
import { AddressTypeOrmRepository } from '../../@core/infra/db/typeorm/repository/AddressTypeOrmRepository';
import { AdminTypeOrmRepository } from '../../@core/infra/db/typeorm/repository/AdminTypeOrmRepository';
import { ClientTypeOrmRepository } from '../../@core/infra/db/typeorm/repository/ClientTypeOrmRepository';
import { UserTypeOrmRepository } from '../../@core/infra/db/typeorm/repository/UserTypeOrmRepository';
import { AdministratorSchema } from '../../@core/infra/db/typeorm/schema/AdministratorSchema';
import { ClientSchema } from '../../@core/infra/db/typeorm/schema/ClientSchema';
import { UserSchema } from '../../@core/infra/db/typeorm/schema/UserSchema';
import { HashRepository } from '../../@core/infra/HashRepository';
import { ClientController } from './client.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClientSchema, AdministratorSchema, UserSchema]),
  ],
  controllers: [ClientController],
  providers: [
    {
      provide: ClientTypeOrmRepository,
      useFactory: (dataSource: DataSource) => {
        return new ClientTypeOrmRepository(dataSource.getRepository(Client));
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
        );
      },
      inject: [
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
      provide: CreateClientUseCase,
      useFactory: (
        clientRepo: IClientRepository,
        userRepo: IUserRepository,
        addressRepo: IAddressRepository,
        hashRepo: IHashRepository,
        admRepo: IAdminRepository,
      ) => {
        return new CreateClientUseCase(
          clientRepo,
          userRepo,
          addressRepo,
          hashRepo,
          admRepo,
        );
      },
      inject: [
        ClientTypeOrmRepository,
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
      provide: UpdateClientUseCase,
      useFactory: (
        userRepo: IUserRepository,
        clientRepo: IClientRepository,
        addressRepo: IAddressRepository,
        hashRepo: IHashRepository,
      ) => {
        return new UpdateClientUseCase(
          userRepo,
          clientRepo,
          addressRepo,
          hashRepo,
        );
      },
      inject: [
        UserTypeOrmRepository,
        ClientTypeOrmRepository,
        AddressTypeOrmRepository,
        HashRepository,
      ],
    },
    {
      provide: DeleteClientUseCase,
      useFactory: (
        userRepo: IUserRepository,
        clientRepo: IClientRepository,
        addressRepo: IAddressRepository,
      ) => {
        return new DeleteClientUseCase(userRepo, clientRepo, addressRepo);
      },
      inject: [
        UserTypeOrmRepository,
        ClientTypeOrmRepository,
        AddressTypeOrmRepository,
      ],
    },
  ],
})
export class ClientModule {}
