import {Job} from 'bullmq';

export interface IListener {
  getName(): string;
  executeJob(job: Job): Promise<void>;
}
