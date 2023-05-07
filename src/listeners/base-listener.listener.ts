import {Worker, Job, WorkerOptions} from 'bullmq';
import {IListener} from './ilistener.listener';
import {DBConnectionConfig} from '../datasources';

export type JobAction = (job: Job) => Promise<void>

export abstract class BaseListener implements IListener {
  protected name: string;
  protected worker: Worker;

  constructor(
      name:string,
      config:DBConnectionConfig
  ) {
    this.name = name;

    const opts: WorkerOptions = {
      connection: {
        host: config.host,
        port: config.port,
        db: config.db,
        username: config.user,
        password: config.password,
      },
    };

    this.worker = new Worker(this.name, this.executeJob, opts);
  }

  getName():string {
    return this.name;
  }

  getWorker(): Worker {
    return this.worker;
  }

  executeJob(job: Job): Promise<void> {
    throw new Error(`Method not implemented. Cannot process: ${job.name}`);
  }
}
