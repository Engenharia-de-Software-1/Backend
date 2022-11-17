import { IIdeaFavoriteRepository } from 'src/@core/domain/repositories/IIdeaRepository';
import { FavoriteUnfavoriteIdeaUseCase } from './../../@core/application/favoriteUnfavoriteIdeaUseCase';
import { IIdeaRepository } from 'src/@core/domain/repositories/IIdeaRepository';
import { GetListIdeaUseCase } from './../../@core/application/getListIdeaUseCase';
import { GetIdeaUseCase } from 'src/@core/application/getIdeaUseCase';
import { UpdateIdeaUseCase } from 'src/@core/application/updateIdeaUseCase';
import { CreateIdeaUseCase } from './../../@core/application/createIdeaUseCase';
import { UserTypeOrmRepository } from 'src/@core/infra/db/typeorm/repository/UserTypeOrmRepository';
import { Module } from "@nestjs/common";
import { getDataSourceToken, TypeOrmModule } from "@nestjs/typeorm";
import { Idea, IdeaFavorite } from "src/@core/domain/entities/idea.entity";
import { IdeaTypeOrmRepository, IdeaFavoriteTypeOrmRepository } from "src/@core/infra/db/typeorm/repository/IdeaRespositoryOrmRepository";
import { IdeaSchema } from "src/@core/infra/db/typeorm/schema/IdeaSchema";
import { UserSchema } from "src/@core/infra/db/typeorm/schema/UserSchema";
import { DataSource } from "typeorm";
import { IdeaController } from "./idea.controller";
import { User } from 'src/@core/domain/entities/user.entity';
import { Client } from 'src/@core/domain/entities/client.entity';
import { Address } from 'src/@core/domain/entities/address.entity';
import { Investor } from 'src/@core/domain/entities/investor.entity';
import { Startup } from 'src/@core/domain/entities/startup.entity';
import { ClientTypeOrmRepository } from 'src/@core/infra/db/typeorm/repository/ClientTypeOrmRepository';
import { ClientSchema } from 'src/@core/infra/db/typeorm/schema/ClientSchema';
import { AdministratorSchema } from 'src/@core/infra/db/typeorm/schema/AdministratorSchema';
import { IClientRepository } from 'src/@core/domain/repositories/IClientRepository';
import { GetListIdeaByUserUseCase } from 'src/@core/application/getListIdeaByUserUseCase';
import { DeleteIdeaUseCase } from 'src/@core/application/deleteIdeaUseCase';
import { GetFavoriteIdeasUseCase } from 'src/@core/application/getFavoriteIdeasUseCase';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      IdeaSchema,
      AdministratorSchema,
      UserSchema,
      ClientSchema,
    ]),
  ],
  controllers: [IdeaController],
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
      provide: IdeaFavoriteTypeOrmRepository,
      useFactory: (dataSource: DataSource) => {
        return new IdeaFavoriteTypeOrmRepository(
          dataSource.getRepository(IdeaFavorite),
          dataSource.getRepository(Idea),
        );
      },
      inject: [
        getDataSourceToken(),
        getDataSourceToken(),
      ],
    },
    {
      provide: IdeaTypeOrmRepository,
      useFactory: (dataSource: DataSource) => {
        return new IdeaTypeOrmRepository(
          dataSource.getRepository(Idea),
        );
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: ClientTypeOrmRepository,
      useFactory: (dataSource: DataSource) => {
        return new ClientTypeOrmRepository(
          dataSource.getRepository(Client),
        );
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: CreateIdeaUseCase,
      useFactory: (ideaRepository: IIdeaRepository, clientRepository: IClientRepository) => {
        return new CreateIdeaUseCase(clientRepository, ideaRepository);
      },
      inject: [IdeaTypeOrmRepository, ClientTypeOrmRepository],
    },
    {
      provide: GetIdeaUseCase,
      useFactory: (ideaRepository: IIdeaRepository) => {
        return new GetIdeaUseCase(ideaRepository);
      },
      inject: [IdeaTypeOrmRepository],
    },
    {
      provide: GetListIdeaUseCase,
      useFactory: (ideaRepository: IIdeaRepository) => {
        return new GetListIdeaUseCase(ideaRepository);
      },
      inject: [IdeaTypeOrmRepository],
    },
    {
      provide: GetListIdeaByUserUseCase,
      useFactory: (ideaRepository: IIdeaRepository) => {
        return new GetListIdeaByUserUseCase(ideaRepository);
      },
      inject: [IdeaTypeOrmRepository],
    },
    {
      provide: UpdateIdeaUseCase,
      useFactory: (ideaRepository: IIdeaRepository) => {
        return new UpdateIdeaUseCase(ideaRepository);
      },
      inject: [IdeaTypeOrmRepository],
    },
    {
      provide: DeleteIdeaUseCase,
      useFactory: (ideaRepository: IIdeaRepository) => {
        return new DeleteIdeaUseCase(ideaRepository);
      },
      inject: [IdeaTypeOrmRepository],
    },
    {
      provide: FavoriteUnfavoriteIdeaUseCase,
      useFactory: (ideaRepository: IIdeaRepository, ideaFavoriteRepository: IIdeaFavoriteRepository) => {
        return new FavoriteUnfavoriteIdeaUseCase(ideaRepository, ideaFavoriteRepository);
      },
      inject: [IdeaTypeOrmRepository, IdeaFavoriteTypeOrmRepository],
    },
    {
      provide: GetFavoriteIdeasUseCase,
      useFactory: (ideaFavoriteRepository: IIdeaFavoriteRepository) => {
        return new GetFavoriteIdeasUseCase(ideaFavoriteRepository);
      },
      inject: [IdeaFavoriteTypeOrmRepository],
    },
  ],
})
export class IdeaModule {}
