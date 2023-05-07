import {Job} from 'bullmq';
import {BaseListener} from './base-listener.listener';
import {DBConnectionConfig, tastsQueuesConfig} from '../datasources';

export class VerificationEmailListener extends BaseListener {
  constructor(dbConfig: DBConnectionConfig = tastsQueuesConfig) {
    super('VerificationEmail', dbConfig);
  }

  async executeJob(job: Job): Promise<void> {
    console.log(`I'm in danger: ${job.name}`);
  }
}
