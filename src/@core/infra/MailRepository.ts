import { IMailRepository } from '../domain/repositories/Mail/IMailRepository';
import nodemailer from 'nodemailer';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: '.env.local' });

export class MailRepository implements IMailRepository {
  sendForgotPassword(to: string, token: string): any {
    const { EMAIL_NAME, EMAIL_USER, EMAIL_APP_PASSWORD } = process.env;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_APP_PASSWORD,
      },
    });
    const mailOptions = {
      from: `${EMAIL_NAME} <${EMAIL_USER}>`,
      to,
      subject: 'Recuperação de senha',
      text: `Para recuperar a senha utilize o token: https://frontend-eight-gules-24.vercel.app/esqueci?token=${token}`,
    };
    transporter.sendMail(mailOptions);
  }
}
