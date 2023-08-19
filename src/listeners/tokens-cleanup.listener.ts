import {Job} from 'bullmq';
import {BaseListener, TasksQueueConfig} from './base.listener';

export class TokensCleanupListener extends BaseListener {
  constructor(dbConfig: TasksQueueConfig) {
    super('TokensCleanup', dbConfig);
  }

  async executeJob(job: Job): Promise<void> {
    console.log(`Execute ${job.name} at ${new Date().toISOString()}`);
  }
}
