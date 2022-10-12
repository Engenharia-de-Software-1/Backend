import { IAddressInput, IAddressOutput } from '../dtos/AddressDTO';

export type IAddressRepository = {
  insert(address: IAddressInput): Promise<void>;
  findByUserId(
    id: string,
    returnNull?: boolean,
  ): Promise<IAddressOutput | null>;
  update(id: string, data: IAddressOutput): Promise<void>;
  delete(id: string): Promise<void>;
};
