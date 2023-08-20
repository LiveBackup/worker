import {Job, Worker, WorkerOptions} from 'bullmq';
import {IListener} from './ilistener.listener';

export type TasksQueueConfig = {
  name: string;
  host: string;
  port: number;
  db: number;
  user?: string;
  password?: string;
};

export namespace ListenersBindings {
  export const TASKS_QUEUES_CONFIG = 'listeners.tasksQueues.config';
}

export type JobAction = (job: Job) => Promise<void>;

export abstract class BaseListener implements IListener {
  readonly name: string;
  readonly worker: Worker;

  constructor(name: string, tasksQueuesConfig: TasksQueueConfig) {
    this.name = name;
    const config = tasksQueuesConfig;

    const opts: WorkerOptions = {
      connection: {
        host: config.host,
        port: config.port,
        db: config.db,
        username: config.user,
        password: config.password,
      },
    };

    this.worker = new Worker(
      this.name,
      async (job: Job) => this.executeJob(job),
      opts,
    );
    this.worker.on('failed', (job: Job | undefined, err: Error) =>
      this.handleError(job, err),
    );
  }

  executeJob(job: Job): Promise<void> {
    throw new Error(`Method not implemented. Cannot process: ${job.name}`);
  }

  handleError(job: Job | undefined, error: Error): void {
    console.error(error.message);
  }
}
