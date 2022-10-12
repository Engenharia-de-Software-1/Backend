import { IAddressInput } from '../dtos/AddressDTO';

export type IAddressRepository = {
  insert(address: IAddressInput): Promise<void>;
};
