import { EntitySchema } from 'typeorm';
import { Address } from '../../../../domain/entities/address.entity';

export const AddressSchema = new EntitySchema({
  name: 'Address',
  target: Address,
  columns: {
    id: {
      type: 'uuid',
      primary: true,
    },
    state: {
      type: String,
      nullable: true,
    },
    city: {
      type: String,
      nullable: true,
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
