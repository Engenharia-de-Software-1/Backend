import { Module } from '@nestjs/common';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CreateInvestorUseCase } from '../../@core/application/createInvestorUseCase';
import { DeleteInvestorUseCase } from '../../@core/application/deleteInvestorUseCase';
import { GetUserUseCase } from '../../@core/application/getUserUseCase';
import { UpdateInvestorUseCase } from '../../@core/application/updateInvestorUseCase';
import { Address } from '../../@core/domain/entities/address.entity';
import { Administrator } from '../../@core/domain/entities/administrator.entity';
import { Investor } from '../../@core/domain/entities/investor.entity';
import { User } from '../../@core/domain/entities/user.entity';
import { IAddressRepository } from '../../@core/domain/repositories/IAddressRepository';
import { IAdminRepository } from '../../@core/domain/repositories/IAdminRepository';
import { IInvestorRepository } from '../../@core/domain/repositories/IInvestorRepository';
import { IHashRepository } from '../../@core/domain/repositories/IHashRepository';
import { IUserRepository } from '../../@core/domain/repositories/IUserRepository';
import { AddressTypeOrmRepository } from '../../@core/infra/db/typeorm/repository/AddressTypeOrmRepository';
import { AdminTypeOrmRepository } from '../../@core/infra/db/typeorm/repository/AdminTypeOrmRepository';
import { InvestorTypeOrmRepository } from '../../@core/infra/db/typeorm/repository/InvestorTypeOrmRepository';
import { UserTypeOrmRepository } from '../../@core/infra/db/typeorm/repository/UserTypeOrmRepository';
import { AdministratorSchema } from '../../@core/infra/db/typeorm/schema/AdministratorSchema';
import { InvestorSchema } from '../../@core/infra/db/typeorm/schema/InvestorSchema';
import { UserSchema } from '../../@core/infra/db/typeorm/schema/UserSchema';
import { HashRepository } from '../../@core/infra/HashRepository';
import { InvestorController } from './Investor.controller';
import { Client } from '../../@core/domain/entities/client.entity';
import { Startup } from '../../@core/domain/entities/startup.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      InvestorSchema,
      AdministratorSchema,
      UserSchema,
      InvestorSchema,
    ]),
  ],
  controllers: [InvestorController],
  providers: [
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
      provide: CreateInvestorUseCase,
      useFactory: (
        investorRepo: IInvestorRepository,
        userRepo: IUserRepository,
        addressRepo: IAddressRepository,
        hashRepo: IHashRepository,
        admRepo: IAdminRepository,
      ) => {
        return new CreateInvestorUseCase(
          investorRepo,
          userRepo,
          addressRepo,
          hashRepo,
          admRepo,
        );
      },
      inject: [
        InvestorTypeOrmRepository,
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
      provide: UpdateInvestorUseCase,
      useFactory: (
        userRepo: IUserRepository,
        investorRepo: IInvestorRepository,
        addressRepo: IAddressRepository,
        hashRepo: IHashRepository,
      ) => {
        return new UpdateInvestorUseCase(
          userRepo,
          investorRepo,
          addressRepo,
          hashRepo,
        );
      },
      inject: [
        UserTypeOrmRepository,
        InvestorTypeOrmRepository,
        AddressTypeOrmRepository,
        HashRepository,
      ],
    },
    {
      provide: DeleteInvestorUseCase,
      useFactory: (
        userRepo: IUserRepository,
        investorRepo: IInvestorRepository,
        addressRepo: IAddressRepository,
      ) => {
        return new DeleteInvestorUseCase(userRepo, investorRepo, addressRepo);
      },
      inject: [
        UserTypeOrmRepository,
        InvestorTypeOrmRepository,
        AddressTypeOrmRepository,
      ],
    },
  ],
})
export class InvestorModule {}
