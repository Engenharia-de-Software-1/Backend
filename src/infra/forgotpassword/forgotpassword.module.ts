import { HashRepository } from './../../@core/infra/HashRepository';
import { ForgotPasswordUseCase } from './../../@core/application/forgotPasswordUseCase';
import { ForgotPassword } from './../../@core/domain/entities/forgotpassword.entity';
import { ForgotPasswordTypeOrmRepository } from './../../@core/infra/db/typeorm/repository/ForgotPasswordTypeOrmRepository';
import { MailRepository } from './../../@core/infra/MailRepository';
import { ForgotPasswordController } from './forgotpassword.controller';
import { ForgotPasswordSchema } from './../../@core/infra/db/typeorm/schema/ForgotPasswordSchema';
import { Module } from '@nestjs/common';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Address } from '../../@core/domain/entities/address.entity';
import { Administrator } from '../../@core/domain/entities/administrator.entity';
import { Client } from '../../@core/domain/entities/client.entity';
import { Investor } from '../../@core/domain/entities/investor.entity';
import { Startup } from '../../@core/domain/entities/startup.entity';
import { User } from '../../@core/domain/entities/user.entity';
import { AdminTypeOrmRepository } from '../../@core/infra/db/typeorm/repository/AdminTypeOrmRepository';
import { UserTypeOrmRepository } from '../../@core/infra/db/typeorm/repository/UserTypeOrmRepository';
import { AdministratorSchema } from '../../@core/infra/db/typeorm/schema/AdministratorSchema';
import { UserSchema } from '../../@core/infra/db/typeorm/schema/UserSchema';
import { ChangeForgotPasswordUseCase } from 'src/@core/application/changeForgotPasswordUseCase';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserSchema,
      AdministratorSchema,
      ForgotPasswordSchema,
    ]),
  ],
  controllers: [ForgotPasswordController],
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
      provide: ForgotPasswordTypeOrmRepository,
      useFactory: (dataSource: DataSource) => {
        return new ForgotPasswordTypeOrmRepository(
          dataSource.getRepository(ForgotPassword),
        );
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: HashRepository,
      useClass: HashRepository,
    },
    {
      provide: MailRepository,
      useClass: MailRepository,
    },
    {
      provide: ForgotPasswordUseCase,
      useFactory: (
        userTypeOrmRepository: UserTypeOrmRepository,
        adminTypeOrmRepository: AdminTypeOrmRepository,
        forgotPasswordTypeOrmRepository: ForgotPasswordTypeOrmRepository,
        mailRepository: MailRepository,
        hashRepository: HashRepository,
      ) => {
        return new ForgotPasswordUseCase(
          userTypeOrmRepository,
          adminTypeOrmRepository,
          forgotPasswordTypeOrmRepository,
          mailRepository,
          hashRepository,
        );
      },
      inject: [
        UserTypeOrmRepository,
        AdminTypeOrmRepository,
        ForgotPasswordTypeOrmRepository,
        MailRepository,
        HashRepository,
      ],
    },
    {
      provide: ChangeForgotPasswordUseCase,
      useFactory: (
        userTypeOrmRepository: UserTypeOrmRepository,
        adminTypeOrmRepository: AdminTypeOrmRepository,
        forgotPasswordTypeOrmRepository: ForgotPasswordTypeOrmRepository,
        hashRepository: HashRepository,
      ) => {
        return new ChangeForgotPasswordUseCase(
          userTypeOrmRepository,
          adminTypeOrmRepository,
          forgotPasswordTypeOrmRepository,
          hashRepository,
        );
      },
      inject: [
        UserTypeOrmRepository,
        AdminTypeOrmRepository,
        ForgotPasswordTypeOrmRepository,
        HashRepository,
      ],
    },
  ],
})
export class ForgotPasswordModule {}
