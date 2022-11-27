import { PlansTypeOrmRepository } from './../../@core/infra/db/typeorm/repository/PlansTypeOrmRepository';
import { IPlansRepository } from './../../@core/domain/repositories/IPlansRepository';
import { Module } from '@nestjs/common';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CreateClientUseCase } from '../../@core/application/ClientUseCases/createClientUseCase';
import { DeleteClientUseCase } from '../../@core/application/ClientUseCases/deleteClientUseCase';
import { GetUserUseCase } from '../../@core/application/getUserUseCase';
import { UpdateClientUseCase } from '../../@core/application/ClientUseCases/updateClientUseCase';
import { Address } from '../../@core/domain/entities/address.entity';
import { Administrator } from '../../@core/domain/entities/administrator.entity';
import { Client } from '../../@core/domain/entities/client.entity';
import { Investor } from '../../@core/domain/entities/investor.entity';
import { Startup } from '../../@core/domain/entities/startup.entity';
import { User } from '../../@core/domain/entities/user.entity';
import { Plans } from 'src/@core/domain/entities/plans.entity';
import { IAddressRepository } from '../../@core/domain/repositories/IAddressRepository';
import { IAdminRepository } from '../../@core/domain/repositories/IAdminRepository';
import { IClientRepository } from '../../@core/domain/repositories/IClientRepository';
import { IHashRepository } from '../../@core/domain/repositories/IHashRepository';
import { IUserRepository } from '../../@core/domain/repositories/IUserRepository';
import { AddressTypeOrmRepository } from '../../@core/infra/db/typeorm/repository/AddressTypeOrmRepository';
import { AdminTypeOrmRepository } from '../../@core/infra/db/typeorm/repository/AdminTypeOrmRepository';
import { ClientTypeOrmRepository } from '../../@core/infra/db/typeorm/repository/ClientTypeOrmRepository';
import { InvestorTypeOrmRepository } from '../../@core/infra/db/typeorm/repository/InvestorTypeOrmRepository';
import { UserTypeOrmRepository } from '../../@core/infra/db/typeorm/repository/UserTypeOrmRepository';
import { AdministratorSchema } from '../../@core/infra/db/typeorm/schema/AdministratorSchema';
import { ClientSchema } from '../../@core/infra/db/typeorm/schema/ClientSchema';
import { InvestorSchema } from '../../@core/infra/db/typeorm/schema/InvestorSchema';
import { UserSchema } from '../../@core/infra/db/typeorm/schema/UserSchema';
import { HashRepository } from '../../@core/infra/HashRepository';
import { ClientController } from './client.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClientSchema,
      AdministratorSchema,
      UserSchema,
      InvestorSchema,
    ]),
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
      provide: InvestorTypeOrmRepository,
      useFactory: (dataSource: DataSource) => {
        return new InvestorTypeOrmRepository(
          dataSource.getRepository(Investor),
        );
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
      provide: PlansTypeOrmRepository,
      useFactory: (dataSource: DataSource) => {
        return new PlansTypeOrmRepository(dataSource.getRepository(Plans));
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: CreateClientUseCase,
      useFactory: (
        clientRepo: IClientRepository,
        userRepo: IUserRepository,
        addressRepo: IAddressRepository,
        hashRepo: IHashRepository,
        admRepo: IAdminRepository,
        planRepo: IPlansRepository
      ) => {
        return new CreateClientUseCase(
          clientRepo,
          userRepo,
          addressRepo,
          hashRepo,
          admRepo,
          planRepo
        );
      },
      inject: [
        ClientTypeOrmRepository,
        UserTypeOrmRepository,
        AddressTypeOrmRepository,
        HashRepository,
        AdminTypeOrmRepository,
        PlansTypeOrmRepository
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
        planRepo: IPlansRepository,
        adminRepo: IAdminRepository,
      ) => {
        return new UpdateClientUseCase(
          userRepo,
          clientRepo,
          addressRepo,
          hashRepo,
          planRepo,
          adminRepo,
        );
      },
      inject: [
        UserTypeOrmRepository,
        ClientTypeOrmRepository,
        AddressTypeOrmRepository,
        HashRepository,
        PlansTypeOrmRepository,
        AdminTypeOrmRepository,
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
