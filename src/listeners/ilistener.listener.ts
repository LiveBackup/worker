import {Job} from 'bullmq';

export interface IListener {
  executeJob(job: Job): Promise<void>;
  handleError(job: Job | undefined, error: Error): void;
}
