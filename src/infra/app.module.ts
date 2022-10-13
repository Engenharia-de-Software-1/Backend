import { StartupModule } from './startup/startup.module';
/* eslint-disable @typescript-eslint/no-var-requires */
import { StartupSchema } from './../@core/infra/db/typeorm/schema/StartupSchema';
import { InvestorSchema } from './../@core/infra/db/typeorm/schema/InvestorSchema';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressSchema } from '../@core/infra/db/typeorm/schema/AddressSchema';
import { AdministratorSchema } from '../@core/infra/db/typeorm/schema/AdministratorSchema';
import { ClientSchema } from '../@core/infra/db/typeorm/schema/ClientSchema';
import { UserSchema } from '../@core/infra/db/typeorm/schema/UserSchema';
import { AdminModule } from './admin/admin.module';
import { ClientModule } from './client/client.module';
import { InvestorModule } from './investor/investor.module';
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
      logging: true,
      entities: [
        AdministratorSchema,
        UserSchema,
        ClientSchema,
        AddressSchema,
        InvestorSchema,
        StartupSchema,
      ],
      autoLoadEntities: true,
    }),
    AdminModule,
    ClientModule,
    InvestorModule,
    StartupModule,
  ],
})
export class AppModule {}
