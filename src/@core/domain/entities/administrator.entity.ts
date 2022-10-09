import { IAdministratorOutput } from '../dtos/AdministratorDTO';
import { createUUID } from '../utils/createUUID';

type IAdminProps = {
  name: string;
  email: string;
  password: string;
};

export class Administrator {
  public readonly id: string;
  public name: Required<IAdminProps['name']>;
  public email: Required<IAdminProps['email']>;
  public password: Required<IAdminProps['password']>;

  private constructor(props: IAdminProps, id?: string) {
    this.id = id || createUUID();

    if (!props) {
      this.name = null;
      this.email = null;
      this.password = null;
      return;
    }

    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
  }

  public static create(props: IAdminProps, id?: string): Administrator {
    return new Administrator(props, id);
  }

  public updateName(name: string): void {
    this.name = name;
  }

  public updateEmail(email: string): void {
    this.email = email;
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

  public toJson(): IAdministratorOutput {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
    };
  }
}
