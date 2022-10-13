import { EntitySchema } from 'typeorm';
import { Investor } from '../../../../domain/entities/investor.entity';

export const InvestorSchema = new EntitySchema({
  name: 'Investor',
  target: Investor,
  columns: {
    id: {
      type: 'uuid',
      primary: true,
    },
    companyName: {
      type: String,
      nullable: true,
    },
    cnpj: {
      type: String,
      nullable: true,
    },
    qtdMembers: {
      type: Number,
      nullable: true,
    },
    profession: {
      type: String,
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
  },
});
