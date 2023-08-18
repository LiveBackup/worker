import {Job} from 'bullmq';
import {DBConnectionConfig} from '../datasources';
import {BaseListener} from './base.listener';

export class TokensCleanupListener extends BaseListener {
  constructor(dbConfig: DBConnectionConfig) {
    super('TokensCleanup', dbConfig);
  }

  async executeJob(job: Job): Promise<void> {
    console.log(`Execute ${job.name} at ${new Date().toISOString()}`);
  }
}
