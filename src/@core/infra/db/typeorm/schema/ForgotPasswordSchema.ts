import { EntitySchema } from 'typeorm';
import { ForgotPassword } from '../../../../domain/entities/forgotpassword.entity';

export const ForgotPasswordSchema = new EntitySchema({
  name: 'ForgotPassword',
  target: ForgotPassword,
  columns: {
    id: {
      type: 'uuid',
      primary: true,
    },
    token: {
      type: String,
      nullable: false,
    },
    userId: {
      type: String,
      nullable: false,
    },
    userType: {
      type: String,
      nullable: false,
    },
    email: {
      type: String,
      nullable: false,
    },
    createdAt: {
      type: String,
      nullable: false,
    },
    expiresAt: {
      type: String,
      nullable: false,
    },
  },
});
