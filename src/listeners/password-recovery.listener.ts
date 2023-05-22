import {Job} from 'bullmq';
import {DBConnectionConfig} from '../datasources';
import {EmailService} from '../services';
import {BaseListener} from './base.listener';

export class PasswordRecoveryListener extends BaseListener {
  protected emailService: EmailService;

  constructor(dbConfig: DBConnectionConfig, emailService: EmailService) {
    super('PasswordRecovery', dbConfig);
    this.emailService = emailService;
  }

  async executeJob(job: Job): Promise<void> {
    const webAppUrl = 'http://localhost:3000';
    const {email, recoveryToken} = job.data;
    await this.emailService.sendPasswordRecoveryEmail(
      webAppUrl,
      email,
      recoveryToken,
    );
  }
}
