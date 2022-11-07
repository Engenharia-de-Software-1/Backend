import { Module } from '@nestjs/common';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { IUserRepository } from '../../@core/domain/repositories/IUserRepository';
import { AdministratorSchema } from '../../@core/infra/db/typeorm/schema/AdministratorSchema';
import { InvestorSchema } from '../../@core/infra/db/typeorm/schema/InvestorSchema';
import { UserSchema } from '../../@core/infra/db/typeorm/schema/UserSchema';
import { ProjectController } from './project.controller';
import { CreateProjectUseCase } from '../../@core/application/createProjectUseCase';
import { IProjectRepository } from '../../@core/domain/repositories/IProjectRepository';
import { GetProjectUseCase } from '../../@core/application/getProjectUseCse';
import { UpdateProjectUseCase } from '../../@core/application/updateProjectUseCase';
import { DeleteProjectUseCase } from '../../@core/application/deleteProjectUseCase';
import { ListProjectsUseCase } from '../../@core/application/listProjectsUseCase';
import { ListProjectsByUserUseCase } from '../../@core/application/listProjectsByUserUseCase';
import { UserTypeOrmRepository } from '../../@core/infra/db/typeorm/repository/UserTypeOrmRepository';
import { DataSource } from 'typeorm';
import { User } from '../../@core/domain/entities/user.entity';
import { Client } from '../../@core/domain/entities/client.entity';
import { Address } from '../../@core/domain/entities/address.entity';
import { Investor } from '../../@core/domain/entities/investor.entity';
import { Startup } from '../../@core/domain/entities/startup.entity';
import { ProjectTypeOrmRepository } from '../../@core/infra/db/typeorm/repository/ProjectTypeOrmRepository';
import { Project } from '../../@core/domain/entities/project.entity';
import { ProjectSchema } from '../../@core/infra/db/typeorm/schema/ProjectSchema';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      InvestorSchema,
      AdministratorSchema,
      UserSchema,
      InvestorSchema,
      ProjectSchema,
    ]),
  ],
  controllers: [ProjectController],
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
      provide: ProjectTypeOrmRepository,
      useFactory: (dataSource: DataSource) => {
        return new ProjectTypeOrmRepository(dataSource.getRepository(Project));
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: CreateProjectUseCase,
      useFactory: (
        projectRepo: IProjectRepository,
        userRepo: IUserRepository,
      ) => {
        return new CreateProjectUseCase(projectRepo, userRepo);
      },
      inject: [ProjectTypeOrmRepository, UserTypeOrmRepository],
    },
    {
      provide: GetProjectUseCase,
      useFactory: (projectRepo: IProjectRepository) => {
        return new GetProjectUseCase(projectRepo);
      },
      inject: [ProjectTypeOrmRepository],
    },
    {
      provide: UpdateProjectUseCase,
      useFactory: (
        userRepo: IUserRepository,
        projectRepo: IProjectRepository,
      ) => {
        return new UpdateProjectUseCase(userRepo, projectRepo);
      },
      inject: [UserTypeOrmRepository, ProjectTypeOrmRepository],
    },
    {
      provide: DeleteProjectUseCase,
      useFactory: (
        userRepo: IUserRepository,
        projectRepo: IProjectRepository,
      ) => {
        return new DeleteProjectUseCase(userRepo, projectRepo);
      },
      inject: [UserTypeOrmRepository, ProjectTypeOrmRepository],
    },
    {
      provide: ListProjectsUseCase,
      useFactory: (projectRepo: IProjectRepository) => {
        return new ListProjectsUseCase(projectRepo);
      },
      inject: [ProjectTypeOrmRepository],
    },
    {
      provide: ListProjectsByUserUseCase,
      useFactory: (projectRepo: IProjectRepository) => {
        return new ListProjectsByUserUseCase(projectRepo);
      },
      inject: [ProjectTypeOrmRepository],
    },
  ],
})
export class ProjectModule {}
