import {Transporter, createTransport} from 'nodemailer';
import {BaseTemplate, EmailVerificationTemplate} from '../templates';

export namespace EmailServiceBindings {
  export const EMAIL_SERVICE = 'services.EmailService';
  export const EMAIL_TRANSPORT_HOST = 'services.email.transport.host';
  export const EMAIL_TRANSPORT_PORT = 'services.email.transport.port';
  export const EMAIL_SENDER_USER = 'services.email.sender.user';
  export const EMAIL_SENDER_PASSWORD = 'services.email.sender.password';
}

export class EmailService {
  readonly transport: Transporter;

  constructor(host: string, port: number, user: string, password: string) {
    const auth = {user, pass: password};
    this.transport = createTransport({host, port, auth});
  }

  private async sendEmail(to: string, template: BaseTemplate): Promise<any> {
    return this.transport.sendMail({
      from: 'jdiegopm12@gmail.com',
      to,
      subject: template.subject,
      html: template.buildTemplate(),
    });
  }

  async sendVerificationEmail(
    webAppUrl: string,
    to: string,
    token: string,
  ): Promise<any> {
    const emailVerification = new EmailVerificationTemplate(webAppUrl, token);
    try {
      return await this.sendEmail(to, emailVerification);
    } catch (error) {
      console.error(`Could not send verification email: ${error.message}`);
    }
  }
}
