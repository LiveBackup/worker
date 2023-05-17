import {Job, Queue, QueueOptions} from 'bullmq';
import App from '../../app';
import {getTestTasksQueuesConfig} from '../fixtures/datasources';
import {EmailServiceBindings} from '../../services';

export const givenRunningApp = async function (): Promise<App> {
  const app = new App();

  app.setDbConfig(await getTestTasksQueuesConfig());
  // Bind email credentials service
  app.bind(EmailServiceBindings.EMAIL_TRANSPORT_HOST).to('');
  app.bind(EmailServiceBindings.EMAIL_TRANSPORT_PORT).to(0);
  app.bind(EmailServiceBindings.EMAIL_SENDER_USER).to('');
  app.bind(EmailServiceBindings.EMAIL_SENDER_PASSWORD).to('');

  app.start();
  return app;
};

export const givenQueue = async function (name = 'TestQueue'): Promise<Queue> {
  const queueConfig = await getTestTasksQueuesConfig();

  const bullMQSettings: QueueOptions = {
    connection: {
      host: queueConfig.host,
      port: queueConfig.port,
      db: queueConfig.db,
      password: queueConfig.password,
    },
  };

  return new Queue(name, bullMQSettings);
};

export const givenJob = async function (name: string, data: any): Promise<Job> {
  const testQueue = await givenQueue();
  const job = testQueue.add(name, data);
  testQueue.close();
  return job;
};
