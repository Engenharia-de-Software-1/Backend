export interface IMailRepository {
  sendForgotPassword(to: string, token: string): any;
}
