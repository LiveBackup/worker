import {Worker, Job} from 'bullmq';

export interface IListener {
  getName(): string;
  getWorker(): Worker;
  executeJob(job: Job): Promise<void>;
}
