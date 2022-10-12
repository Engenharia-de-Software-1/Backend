import { Module } from '@nestjs/common';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CreateAdministratorUseCase } from '../../@core/application/createAdministratorUseCase';
import { DeleteAdministratorUseCase } from '../../@core/application/deleteAdministratorUseCase';
import { GetAdministratorUseCase } from '../../@core/application/getAdministratorUseCase';
import { UpdateAdministratorUseCase } from '../../@core/application/updateAdministratorUseCase';
import { Administrator } from '../../@core/domain/entities/administrator.entity';
import { IAdminRepository } from '../../@core/domain/repositories/IAdminRepository';
import { IHashRepository } from '../../@core/domain/repositories/IHashRepository';
import { AdminTypeOrmRepository } from '../../@core/infra/db/typeorm/repository/AdminTypeOrmRepository';
import { AdministratorSchema } from '../../@core/infra/db/typeorm/schema/AdministratorSchema';
import { HashRepository } from '../../@core/infra/HashRepository';
import { AdminController } from './admin.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AdministratorSchema])],
  controllers: [AdminController],
  providers: [
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
      provide: CreateAdministratorUseCase,
      useFactory: (adminRepo: IAdminRepository, hashRepo: IHashRepository) => {
        return new CreateAdministratorUseCase(hashRepo, adminRepo);
      },
      inject: [AdminTypeOrmRepository, HashRepository],
    },
    {
      provide: GetAdministratorUseCase,
      useFactory: (adminRepo: IAdminRepository) => {
        return new GetAdministratorUseCase(adminRepo);
      },
      inject: [AdminTypeOrmRepository],
    },
    {
      provide: UpdateAdministratorUseCase,
      useFactory: (adminRepo: IAdminRepository, hashRepo: IHashRepository) => {
        return new UpdateAdministratorUseCase(adminRepo, hashRepo);
      },
      inject: [AdminTypeOrmRepository, HashRepository],
    },
    {
      provide: DeleteAdministratorUseCase,
      useFactory: (adminRepo: IAdminRepository) => {
        return new DeleteAdministratorUseCase(adminRepo);
      },
      inject: [AdminTypeOrmRepository],
    },
  ],
})
export class AdminModule {}