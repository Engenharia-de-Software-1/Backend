import { EntitySchema } from 'typeorm';
import { Administrator } from '../../../../domain/entities/administrator.entity';

export const AdministratorSchema = new EntitySchema({
  name: 'Administrator',
  target: Administrator,
  columns: {
    id: {
      type: 'uuid',
      primary: true,
    },
    name: {
      type: String,
      nullable: false,
    },
    email: {
      type: String,
      nullable: false,
    },
    password: {
      type: String,
      nullable: false,
    },
  },
});
