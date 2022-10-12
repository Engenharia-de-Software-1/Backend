import { Repository } from 'typeorm';
import { IAddressOutput } from '../../../../domain/dtos/AddressDTO';
import { Address } from '../../../../domain/entities/address.entity';
import { IAddressRepository } from '../../../../domain/repositories/IAddressRepository';

export class AddressTypeOrmRepository implements IAddressRepository {
  constructor(private ormRepo: Repository<Address>) {}

  async insert(address: IAddressOutput): Promise<void> {
    await this.ormRepo.save(address);
  }

  async findByUserId(
    userId: string,
    returnNull?: boolean,
  ): Promise<IAddressOutput | null> {
    const address = await this.ormRepo.findOne({ where: { userId } });
    if (!address && returnNull) {
      return null;
    } else if (!address) {
      throw new Error('Address not found');
    }
    return address;
  }

  public async update(userId: string, input: IAddressOutput): Promise<void> {
    const address = await this.ormRepo.findOne({ where: { userId } });
    address.state = input.state || address.state;
    address.city = input.city || address.city;
    if (input.state || input.city) address.updatedAt = new Date();

    await this.ormRepo.save(address);
  }

  public async delete(userId: string): Promise<void> {
    const output = await this.findByUserId(userId);
    await this.ormRepo.delete({ id: output.id });
  }
}
