import { EntitySchema } from 'typeorm';
import { User } from '../../../../domain/entities/user.entity';

export const UserSchema = new EntitySchema({
  name: 'User',
  target: User,
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
    phone: {
      type: String,
      nullable: false,
    },
    planName: {
      type: String,
      nullable: false,
    },
    planCreatedAt: {
      type: Date,
      nullable: false,
    },
    planExpirationDate: {
      type: Date,
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
  },
});
