import { ForgotPasswordModule } from './forgotpassword/forgotpassword.module';
import { ForgotPasswordSchema } from './../@core/infra/db/typeorm/schema/ForgotPasswordSchema';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { Administrator } from './../@core/domain/entities/administrator.entity';
import { AdminTypeOrmRepository } from './../@core/infra/db/typeorm/repository/AdminTypeOrmRepository';
import { PlansModule } from './plans/plans.module';
import { PlansController } from './plans/plans.controller';
import { LoginModule } from './login/login.module';
import { StartupModule } from './startup/startup.module';
import { StartupSchema } from './../@core/infra/db/typeorm/schema/StartupSchema';
import { InvestorSchema } from './../@core/infra/db/typeorm/schema/InvestorSchema';
import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { AddressSchema } from '../@core/infra/db/typeorm/schema/AddressSchema';
import { AdministratorSchema } from '../@core/infra/db/typeorm/schema/AdministratorSchema';
import { ClientSchema } from '../@core/infra/db/typeorm/schema/ClientSchema';
import { UserSchema } from '../@core/infra/db/typeorm/schema/UserSchema';
import { AdminModule } from './admin/admin.module';
import { ClientModule } from './client/client.module';
import { InvestorModule } from './investor/investor.module';
import { ProjectSchema } from '../@core/infra/db/typeorm/schema/ProjectSchema';
import { ProjectModule } from './project/project.module';
import { AuthMiddleware } from 'src/@core/domain/middlewares/auth.middleware';
import { AdminController } from './admin/admin.controller';
import { UserTypeOrmRepository } from 'src/@core/infra/db/typeorm/repository/UserTypeOrmRepository';
import { User } from 'src/@core/domain/entities/user.entity';
import { Client } from 'src/@core/domain/entities/client.entity';
import { Address } from 'src/@core/domain/entities/address.entity';
import { Investor } from 'src/@core/domain/entities/investor.entity';
import { Startup } from 'src/@core/domain/entities/startup.entity';
import { DataSource } from 'typeorm';
import { JwtRepository } from 'src/@core/infra/JwtRepository';
import { InvestorController } from './investor/investor.controller';
import { ClientController } from './client/client.controller';
import { StartupController } from './startup/startup.controller';
import { IdeaController } from './ideas/idea.controller';
import { IdeaModule } from './ideas/idea.module';
import {
  IdeaFavoriteSchema,
  IdeaSchema,
} from 'src/@core/infra/db/typeorm/schema/IdeaSchema';
import { PlansSchema } from 'src/@core/infra/db/typeorm/schema/PlansSchema';

/* eslint-disable-next-line @typescript-eslint/no-var-requires */
require('dotenv').config({ path: '.env.local' });

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      synchronize: true,
      logging: false,
      entities: [
        AdministratorSchema,
        UserSchema,
        ClientSchema,
        AddressSchema,
        InvestorSchema,
        StartupSchema,
        IdeaSchema,
        IdeaFavoriteSchema,
        ProjectSchema,
        PlansSchema,
        ForgotPasswordSchema,
      ],
      autoLoadEntities: true,
    }),
    UserModule,
    AdminModule,
    ClientModule,
    InvestorModule,
    StartupModule,
    LoginModule,
    IdeaModule,
    ProjectModule,
    PlansModule,
    ForgotPasswordModule,
  ],
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
      provide: JwtRepository,
      useClass: JwtRepository,
    },
    AuthMiddleware,
  ],
  exports: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'admin', method: RequestMethod.POST },
        { path: 'investor', method: RequestMethod.POST },
        { path: 'client', method: RequestMethod.POST },
        { path: 'startup', method: RequestMethod.POST },
      )
      .forRoutes(
        UserController,
        AdminController,
        InvestorController,
        ClientController,
        StartupController,
        IdeaController,
        PlansController,
      );
  }
}
