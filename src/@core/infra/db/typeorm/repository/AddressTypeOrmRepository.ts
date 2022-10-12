import { Repository } from 'typeorm';
import { IAddressOutput } from '../../../../domain/dtos/AddressDTO';
import { Address } from '../../../../domain/entities/Address.entity';
import { IAddressRepository } from '../../../../domain/repositories/IAddressRepository';

export class AddressTypeOrmRepository implements IAddressRepository {
  constructor(private ormRepo: Repository<Address>) {}

  async insert(address: IAddressOutput): Promise<void> {
    await this.ormRepo.save(address);
  }
}
