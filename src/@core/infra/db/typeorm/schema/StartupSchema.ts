import { EntitySchema } from 'typeorm';
import { Startup } from '../../../../domain/entities/startup.entity';

export const StartupSchema = new EntitySchema({
  name: 'Startup',
  target: Startup,
  columns: {
    id: {
      type: 'uuid',
      primary: true,
    },
    startupName: {
      type: String,
      nullable: true,
    },
    cnpj: {
      type: String,
      nullable: true,
    },
    employees: {
      type: Number,
      nullable: false,
    },
    userId: {
      type: String,
      nullable: false,
    },
    createdAt: {
      type: String,
      nullable: false,
    },
    updatedAt: {
      type: String,
      nullable: false,
    },
    views: {
      type: Number,
      nullable: false,
    },
  },
});
