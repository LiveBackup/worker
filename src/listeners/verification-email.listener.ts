import {Job} from 'bullmq';
import {BaseListener} from './base.listener';
import {DBConnectionConfig} from '../datasources';
import {EmailService} from '../services';

export class VerificationEmailListener extends BaseListener {
  protected emailService: EmailService;

  constructor(dbConfig: DBConnectionConfig, emailService: EmailService) {
    super('VerificationEmail', dbConfig);
    this.emailService = emailService;
  }

  async executeJob(job: Job): Promise<void> {
    const webAppUrl = 'http://localhost:3000';
    const {email, accessToken} = job.data;
    this.emailService.sendVerificationEmail(webAppUrl, email, accessToken);
  }
}
