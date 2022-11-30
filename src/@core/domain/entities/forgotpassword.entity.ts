import { createUUID } from '../utils/createUUID';

export interface IForgotPasswordProps {
  id?: string;
  token: string;
  userId: string;
  userType: string;
  email: string;
  createdAt?: Date;
  expiresAt?: Date;
}

export class ForgotPassword {
  public readonly id: string;
  public userId: Required<IForgotPasswordProps['userId']>;
  public token: Required<IForgotPasswordProps['token']>;
  public userType: Required<IForgotPasswordProps['userType']>;
  public email: Required<IForgotPasswordProps['email']>;
  public readonly createdAt: IForgotPasswordProps['createdAt'];
  public readonly expiresAt: IForgotPasswordProps['expiresAt'];

  private constructor(props: IForgotPasswordProps, id?: string) {
    this.id = id || createUUID();

    if (!props) {
      this.userId = null;
      this.userType = null;
      this.email = null;
      this.token = null;
      this.createdAt = null;
      this.expiresAt = null;
      return;
    }
    const now = new Date();

    this.userId = props.userId;
    this.userType = props.userType;
    this.email = props.email;
    this.token = props.token;
    this.createdAt = props.createdAt || new Date();
    this.expiresAt =
      props.expiresAt || new Date(now.setDate(now.getDate() + 1));
  }

  static create(props: IForgotPasswordProps, id?: string): ForgotPassword {
    return new ForgotPassword(props, id);
  }

  public toJson(): IForgotPasswordProps {
    return {
      id: this.id,
      userId: this.userId,
      userType: this.userType,
      token: this.token,
      email: this.email,
      createdAt: this.createdAt,
      expiresAt: this.expiresAt,
    };
  }
}
