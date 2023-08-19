import {Job} from 'bullmq';
import {EmailService} from '../services';
import {BaseListener, TasksQueueConfig} from './base.listener';

export class PasswordRecoveryListener extends BaseListener {
  protected emailService: EmailService;

  constructor(dbConfig: TasksQueueConfig, emailService: EmailService) {
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
