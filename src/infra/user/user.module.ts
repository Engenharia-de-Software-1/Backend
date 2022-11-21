import { GetAllUsersUseCase } from 'src/@core/application/getAllUsersUsecase';
import { InvestorTypeOrmRepository } from './../../@core/infra/db/typeorm/repository/InvestorTypeOrmRepository';
import { StartupTypeOrmRepository } from './../../@core/infra/db/typeorm/repository/StartupTypeOrmRepository';
import { Administrator } from './../../@core/domain/entities/administrator.entity';
import { UserTypeOrmRepository } from 'src/@core/infra/db/typeorm/repository/UserTypeOrmRepository';
import { Module } from "@nestjs/common";
import { getDataSourceToken, TypeOrmModule } from "@nestjs/typeorm";
import { UserSchema } from "src/@core/infra/db/typeorm/schema/UserSchema";
import { DataSource } from "typeorm";
import { UserController } from './user.controller';
import { User } from 'src/@core/domain/entities/user.entity';
import { Client } from 'src/@core/domain/entities/client.entity';
import { Address } from 'src/@core/domain/entities/address.entity';
import { Investor } from 'src/@core/domain/entities/investor.entity';
import { Startup } from 'src/@core/domain/entities/startup.entity';
import { ClientTypeOrmRepository } from 'src/@core/infra/db/typeorm/repository/ClientTypeOrmRepository';
import { ClientSchema } from 'src/@core/infra/db/typeorm/schema/ClientSchema';
import { AdministratorSchema } from 'src/@core/infra/db/typeorm/schema/AdministratorSchema';
import { InvestorSchema } from 'src/@core/infra/db/typeorm/schema/InvestorSchema';
import { StartupSchema } from 'src/@core/infra/db/typeorm/schema/StartupSchema';
import { PlansTypeOrmRepository } from 'src/@core/infra/db/typeorm/repository/PlansTypeOrmRepository';
import { AdminTypeOrmRepository } from 'src/@core/infra/db/typeorm/repository/AdminTypeOrmRepository';
import { DeletePlanUseCase } from 'src/@core/application/PlansUseCases/deletePlanUseCase';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserSchema,
            ClientSchema,
            AdministratorSchema,
            InvestorSchema,
            StartupSchema,
        ]),
    ],
    controllers: [UserController],
    providers: [
        {
            provide: UserTypeOrmRepository,
            useFactory: (dataSource: DataSource) => {
                return new UserTypeOrmRepository(
                    dataSource.getRepository(User),
                    dataSource.getRepository(Client),
                    dataSource.getRepository(Address),
                    dataSource.getRepository(Investor),
                    dataSource.getRepository(Startup)
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
                    dataSource.getRepository(Administrator)
                );
            },
            inject: [getDataSourceToken()],
        },
        {
            provide: ClientTypeOrmRepository,
            useFactory: (dataSource: DataSource) => {
                return new ClientTypeOrmRepository(
                    dataSource.getRepository(Client)
                );
            },
            inject: [getDataSourceToken()],
        },
        {
            provide: StartupTypeOrmRepository,
            useFactory: (dataSource: DataSource) => {
                return new StartupTypeOrmRepository(
                    dataSource.getRepository(Startup)
                );
            },
            inject: [getDataSourceToken()],
        },
        {
            provide: InvestorTypeOrmRepository,
            useFactory: (dataSource: DataSource) => {
                return new InvestorTypeOrmRepository(
                    dataSource.getRepository(Investor)
                );
            },
            inject: [getDataSourceToken()],
        },
        {
            provide: AdminTypeOrmRepository,
            useFactory: (dataSource: DataSource) => {
                return new AdminTypeOrmRepository(
                    dataSource.getRepository(Administrator)
                );
            },
            inject: [getDataSourceToken()],
        },
        {
            provide: GetAllUsersUseCase,
            useFactory: (userRepo: UserTypeOrmRepository) => {
                return new GetAllUsersUseCase(userRepo);
            },
            inject: [UserTypeOrmRepository],
        }
    ],
})
export class UserModule {}


