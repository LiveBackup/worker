import {Job} from 'bullmq';
import {EmailService} from '../services';
import {BaseListener, TasksQueueConfig} from './base.listener';

export class VerificationEmailListener extends BaseListener {
  protected emailService: EmailService;

  constructor(tasksQueuesConfig: TasksQueueConfig, emailService: EmailService) {
    super('VerificationEmail', tasksQueuesConfig);
    this.emailService = emailService;
  }

  async executeJob(job: Job): Promise<void> {
    const webAppUrl = 'http://localhost:3000';
    const {email, accessToken} = job.data;
    await this.emailService.sendVerificationEmail(
      webAppUrl,
      email,
      accessToken,
    );
  }
}
