import {Job} from 'bullmq';
import {DBConnectionConfig} from '../datasources';
import {EmailService} from '../services';
import {BaseListener} from './base.listener';

export class VerificationEmailListener extends BaseListener {
  protected emailService: EmailService;

  constructor(dbConfig: DBConnectionConfig, emailService: EmailService) {
    super('VerificationEmail', dbConfig);
    this.emailService = emailService;
  }

  async executeJob(job: Job): Promise<void> {
    console.log('Sending veification email');

    const webAppUrl = 'http://localhost:3000';
    const {email, accessToken} = job.data;
    const response = await this.emailService.sendVerificationEmail(
      webAppUrl,
      email,
      accessToken,
    );
    console.log(`Email sent: ${response.accepted}`);
  }
}
