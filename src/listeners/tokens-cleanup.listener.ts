import {Job} from 'bullmq';
import {BaseListener, TasksQueueConfig} from './base.listener';

export class TokensCleanupListener extends BaseListener {
  constructor(tasksQueuesConfig: TasksQueueConfig) {
    super('TokensCleanup', tasksQueuesConfig);
  }

  async executeJob(job: Job): Promise<void> {
    console.log(`Execute ${job.name} at ${new Date().toISOString()}`);
  }
}
