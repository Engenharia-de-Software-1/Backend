export interface IForgotPasswordInput {
  email: string;
}

export interface IForgotPasswordOutput {
  id: string;
  token: string;
  userId: string;
  userType: string;
  email: string;
  createdAt: Date;
  expiresAt: Date;
}
