/* eslint-disable @typescript-eslint/no-var-requires */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdministratorSchema } from '../@core/infra/db/typeorm/schema/AdministratorSchema';
import { AdminModule } from './admin/admin.module';
require('dotenv').config({ path: '.env.local' });

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      synchronize: true,
      logging: true,
      entities: [AdministratorSchema],
    }),
    AdminModule,
  ],
})
export class AppModule {}
