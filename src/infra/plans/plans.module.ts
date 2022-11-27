import { GetAllPlansUseCase } from './../../@core/application/PlansUseCases/getAllPlansUseCase';
import { UpdatePlanUseCase } from './../../@core/application/PlansUseCases/updatePlanUseCase';
import { CreatePlanUseCase } from './../../@core/application/PlansUseCases/createPlanUseCase';
import { InvestorTypeOrmRepository } from './../../@core/infra/db/typeorm/repository/InvestorTypeOrmRepository';
import { StartupTypeOrmRepository } from './../../@core/infra/db/typeorm/repository/StartupTypeOrmRepository';
import { Administrator } from './../../@core/domain/entities/administrator.entity';
import { UserTypeOrmRepository } from 'src/@core/infra/db/typeorm/repository/UserTypeOrmRepository';
import { Module } from '@nestjs/common';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from 'src/@core/infra/db/typeorm/schema/UserSchema';
import { DataSource } from 'typeorm';
import { PlansController } from './plans.controller';
import { User } from 'src/@core/domain/entities/user.entity';
import { Client } from 'src/@core/domain/entities/client.entity';
import { Address } from 'src/@core/domain/entities/address.entity';
import { Investor } from 'src/@core/domain/entities/investor.entity';
import { Startup } from 'src/@core/domain/entities/startup.entity';
import { ClientTypeOrmRepository } from 'src/@core/infra/db/typeorm/repository/ClientTypeOrmRepository';
import { ClientSchema } from 'src/@core/infra/db/typeorm/schema/ClientSchema';
import { AdministratorSchema } from 'src/@core/infra/db/typeorm/schema/AdministratorSchema';
import { PlansSchema } from 'src/@core/infra/db/typeorm/schema/PlansSchema';
import { InvestorSchema } from 'src/@core/infra/db/typeorm/schema/InvestorSchema';
import { StartupSchema } from 'src/@core/infra/db/typeorm/schema/StartupSchema';
import { PlansTypeOrmRepository } from 'src/@core/infra/db/typeorm/repository/PlansTypeOrmRepository';
import { Plans } from 'src/@core/domain/entities/plans.entity';
import { AdminTypeOrmRepository } from 'src/@core/infra/db/typeorm/repository/AdminTypeOrmRepository';
import { DeletePlanUseCase } from 'src/@core/application/PlansUseCases/deletePlanUseCase';
import { GetPlanByIdUseCase } from 'src/@core/application/PlansUseCases/getPlanByIdUseCase';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PlansSchema,
      AdministratorSchema,
      UserSchema,
      ClientSchema,
      InvestorSchema,
      StartupSchema,
    ]),
  ],
  controllers: [PlansController],
  providers: [
    {
      provide: PlansTypeOrmRepository,
      useFactory: (dataSource: DataSource) => {
        return new PlansTypeOrmRepository(dataSource.getRepository(Plans));
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
      provide: ClientTypeOrmRepository,
      useFactory: (dataSource: DataSource) => {
        return new ClientTypeOrmRepository(dataSource.getRepository(Client));
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: StartupTypeOrmRepository,
      useFactory: (dataSource: DataSource) => {
        return new StartupTypeOrmRepository(dataSource.getRepository(Startup));
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
      provide: CreatePlanUseCase,
      useFactory: (
        repository: PlansTypeOrmRepository,
        update: UpdatePlanUseCase,
      ) => {
        return new CreatePlanUseCase(repository, update);
      },
      inject: [PlansTypeOrmRepository, UpdatePlanUseCase],
    },
    {
      provide: UpdatePlanUseCase,
      useFactory: (repository: PlansTypeOrmRepository) => {
        return new UpdatePlanUseCase(repository);
      },
      inject: [PlansTypeOrmRepository],
    },
    {
      provide: DeletePlanUseCase,
      useFactory: (repository: PlansTypeOrmRepository) => {
        return new DeletePlanUseCase(repository);
      },
      inject: [PlansTypeOrmRepository],
    },
    {
      provide: GetPlanByIdUseCase,
      useFactory: (repository: PlansTypeOrmRepository) => {
        return new GetPlanByIdUseCase(repository);
      },
      inject: [PlansTypeOrmRepository],
    },
    {
      provide: GetAllPlansUseCase,
      useFactory: (repository: PlansTypeOrmRepository) => {
        return new GetAllPlansUseCase(repository);
      },
      inject: [PlansTypeOrmRepository],
    },
  ],
})
export class PlansModule {}
