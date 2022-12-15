import { IUserOutput } from '../dtos/UserDTO';
import { createUUID } from '../utils/createUUID';

export type IUserProps = {
  id?: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  planName?: string;
  planCreatedAt?: Date;
  planExpirationDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
};

export class User {
  public readonly id: string;
  public name: Required<IUserProps['name']>;
  public email: Required<IUserProps['email']>;
  public password: Required<IUserProps['password']>;
  public phone: Required<IUserProps['phone']>;
  public planName: Required<IUserProps['planName']>;
  public planCreatedAt: Required<IUserProps['planCreatedAt']>;
  public planExpirationDate: Required<IUserProps['planExpirationDate']>;
  public readonly createdAt: IUserProps['createdAt'];
  public readonly updatedAt: IUserProps['updatedAt'];

  private constructor(props: IUserProps, id?: string) {
    this.id = id || createUUID();

    if (!props) {
      this.name = null;
      this.email = null;
      this.password = null;
      this.phone = null;
      this.planName = null;
      this.planCreatedAt = null;
      this.planExpirationDate = null;
      this.createdAt = null;
      this.updatedAt = null;
      return;
    }

    const today = new Date();
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.phone = props.phone;
    this.planName = props.planName || 'default';
    this.planCreatedAt = props.planCreatedAt || new Date();
    this.planExpirationDate =
      props.planExpirationDate || new Date(today.setDate(today.getDate() + 30));
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt || new Date();
  }

  static create(props: IUserProps, id?: string): User {
    return new User(props, id);
  }

  public updateName(name: string): void {
    this.name = name;
  }

  public updateEmail(email: string): void {
    this.email = email;
  }

  public updatePhone(phone: string): void {
    this.phone = phone;
  }

  public updatePassword(password: string): void {
    this.password = password;
  }

  public updatePlan(planName: string, days = 30): void {
    this.planName = planName;
    const today = new Date();
    this.planCreatedAt = new Date();
    this.planExpirationDate = new Date(today.setDate(today.getDate() + days));
    console.log(this.planExpirationDate);
  }

  public validateEmail(): void {
    if (!this.email.includes('@') || !this.email.includes('.')) {
      throw new Error('Invalid email');
    }
  }

  public validatePassword(): void {
    if (this.password.length < 8) {
      throw new Error('Invalid password');
    }
  }

  public validateIfPasswordMatch(password: string) {
    if (this.password !== password) {
      throw new Error('Invalid password');
    }
  }

  public validatePhoneNumber(): void {
    const phoneNumber = this.phone.replace(/[^\d]+/g, '');
    if (phoneNumber.length < 10 || phoneNumber.length > 11) {
      throw new Error('Invalid phone number');
    }
  }

  public toJson(): IUserOutput {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      phone: this.phone,
      planName: this.planName,
      planCreatedAt: this.planCreatedAt,
      planExpirationDate: this.planExpirationDate,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
