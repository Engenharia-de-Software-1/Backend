import { IAddressOutput } from '../dtos/AddressDTO';
import { createUUID } from '../utils/createUUID';

export type IAddressProps = {
  id?: string;
  city: string;
  state: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Address {
  public readonly id: string;
  public city: Required<IAddressProps['city']>;
  public state: Required<IAddressProps['state']>;
  public userId: Required<IAddressProps['userId']>;
  public createdAt: IAddressProps['createdAt'];
  public updatedAt: IAddressProps['updatedAt'];

  private constructor(props: IAddressProps, id?: string) {
    this.id = id || createUUID();

    if (!props) {
      this.city = null;
      this.state = null;
      this.userId = null;
      this.createdAt = null;
      this.updatedAt = null;
      return;
    }

    this.city = props.city;
    this.state = props.state;
    this.userId = props.userId;
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt || new Date();
  }

  public static create(props: IAddressProps, id?: string): Address {
    return new Address(props, id);
  }

  public updateCity(city: string): void {
    this.city = city;
  }

  public updateState(state: string): void {
    this.state = state;
  }

  public toJson(): IAddressOutput {
    return {
      id: this.id,
      city: this.city,
      state: this.state,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
