import { IJwtRepository } from './../../../dist/@core/domain/repositories/Auth/IJwt.d';
import { JwtRepository } from './../../@core/infra/JwtRepository';
import { LoginUseCase } from './../../@core/application/loginUserUseCase';
import { LoginController } from './login.controller';
import { Module } from '@nestjs/common';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Address } from '../../@core/domain/entities/address.entity';
import { Administrator } from '../../@core/domain/entities/administrator.entity';
import { Startup } from '../../@core/domain/entities/startup.entity';
import { User } from '../../@core/domain/entities/user.entity';
import { Client } from '../../@core/domain/entities/client.entity';
import { Investor } from '../../@core/domain/entities/investor.entity';
import { IHashRepository } from '../../@core/domain/repositories/IHashRepository';
import { IUserRepository } from '../../@core/domain/repositories/IUserRepository';
import { AdminTypeOrmRepository } from '../../@core/infra/db/typeorm/repository/AdminTypeOrmRepository';
import { UserTypeOrmRepository } from '../../@core/infra/db/typeorm/repository/UserTypeOrmRepository';
import { AdministratorSchema } from '../../@core/infra/db/typeorm/schema/AdministratorSchema';
import { StartupSchema } from '../../@core/infra/db/typeorm/schema/StartupSchema';
import { UserSchema } from '../../@core/infra/db/typeorm/schema/UserSchema';
import { HashRepository } from '../../@core/infra/HashRepository';

@Module({
  imports: [
    TypeOrmModule.forFeature([StartupSchema, AdministratorSchema, UserSchema]),
  ],
  controllers: [LoginController],
  providers: [
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
      provide: JwtRepository,
      useClass: JwtRepository,
    },
    {
      provide: LoginUseCase,
      useFactory: (
        jwtService: IJwtRepository,
        userRepo: IUserRepository,
        hashRepo: IHashRepository,
      ) => {
        return new LoginUseCase(jwtService, userRepo, hashRepo);
      },
      inject: [JwtRepository, UserTypeOrmRepository, HashRepository],
    },
  ],
})
export class LoginModule {}
