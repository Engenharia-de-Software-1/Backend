import { IAddressOutput } from '../../domain/dtos/AddressDTO';
import { IAddressRepository } from '../../domain/repositories/IAddressRepository';

export class FakeAddressRepository implements IAddressRepository {
  public addresss: IAddressOutput[] = [];

  async insert(address: IAddressOutput): Promise<void> {
    this.addresss.push(address);
  }
}
