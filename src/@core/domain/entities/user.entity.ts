import { IUserOutput } from '../dtos/UserDTO';
import { createUUID } from '../utils/createUUID';

export type IUserProps = {
  id?: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class User {
  public readonly id: string;
  public name: Required<IUserProps['name']>;
  public email: Required<IUserProps['email']>;
  public password: Required<IUserProps['password']>;
  public phone: Required<IUserProps['phone']>;
  public readonly createdAt: IUserProps['createdAt'];
  public readonly updatedAt: IUserProps['updatedAt'];

  private constructor(props: IUserProps, id?: string) {
    this.id = id || createUUID();

    if (!props) {
      this.name = null;
      this.email = null;
      this.password = null;
      this.phone = null;
      this.createdAt = null;
      this.updatedAt = null;
      return;
    }

    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.phone = props.phone;
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt || new Date();
  }

  static create(props: IUserProps, id?: string): User {
    return new User(props, id);
  }

  public updatePassword(password: string): void {
    this.password = password;
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

  public toJson(): IUserOutput {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      phone: this.phone,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
