import { IAddressOutput } from '../../domain/dtos/AddressDTO';
import { IAddressRepository } from '../../domain/repositories/IAddressRepository';

export class FakeAddressRepository implements IAddressRepository {
  public address: IAddressOutput[] = [];

  async insert(address: IAddressOutput): Promise<void> {
    this.address.push(address);
  }

  public async findByUserId(
    id: string,
    returnNull?: boolean,
  ): Promise<IAddressOutput | null> {
    const address = this.address.find((address) => address.userId === id);
    if (!address && returnNull) {
      return null;
    } else if (!address) {
      throw new Error('Address not found');
    }
    return address;
  }

  public async delete(userId: string): Promise<void> {
    const address = await this.findByUserId(userId);
    this.address.splice(this.address.indexOf(address), 1);
  }

  public async update(id: string, input: IAddressOutput): Promise<void> {
    const address = await this.findByUserId(id);
    address.state = input.state || address.state;
    address.city = input.city || address.city;
    if (input.state || input.city) address.updatedAt = new Date();
    return;
  }
}
