import {BaseTemplate} from './base.template';

export class EmailVerificationTemplate extends BaseTemplate {
  protected appUrl: string;
  protected token: string;

  constructor(appUrl: string, token: string) {
    super('Verify your email', 'LiveBackup - Please verify your email');
    this.appUrl = appUrl;
    this.token = token;
  }

  protected buildBody(): string {
    return `
      <h1>Welcome to LiveBackup!</h1>
      <p>Please verify your email before to start using the live backup services</p>
      <a href="${this.appUrl}?token?=${this.token}">
        Verify your email
      </a>
    `;
  }
}
