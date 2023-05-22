import {BaseTemplate} from './base.template';

export class PasswordRecoveryTemplate extends BaseTemplate {
  protected appUrl: string;
  protected recoveryToken: string;

  constructor(appUrl: string, token: string) {
    super('Reset your password', 'LiveBackup - Reset your password');
    this.appUrl = appUrl;
    this.recoveryToken = token;
  }

  protected buildBody(): string {
    return `
      <h1>Reset your password</h1>
      <p>Have you lost your password? Don't worry, click the button below and set a new password</p>
      <a href="${this.appUrl}?token?=${this.recoveryToken}">
        Reset your password
      </a>
    `;
  }
}
