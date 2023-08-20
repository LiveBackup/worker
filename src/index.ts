import dotenv from 'dotenv';
import App from './app';
import {UserDbBindings, UserDbDataSource} from './datasources';
import {ListenersBindings, TasksQueueConfig} from './listeners';
import {EmailServiceBindings} from './services';

dotenv.config();

async function main() {
  const app = new App();

  // Set up the user db
  const userDb = new UserDbDataSource();
  app.bind(UserDbBindings.DB).to(userDb);

  // Setup the redis connection options
  app.bind(ListenersBindings.TASKS_QUEUES_CONFIG).to({
    name: 'tasks_queues',
    host: process.env.TASKS_QUEUE_HOST ?? 'localhost',
    port: Number(process.env.TASKS_QUEUE_PORT ?? 6379),
    db: Number(process.env.USER_DB_DATABASE ?? 0),
    user: process.env.TASKS_QUEUE_USER,
    password: process.env.TASKS_QUEUE_PASSWORD,
  } as TasksQueueConfig);

  // Setup the email sender credentials
  app
    .bind(EmailServiceBindings.EMAIL_TRANSPORT_HOST)
    .to(process.env.EMAIL_TRANSPORT_HOST);
  app
    .bind(EmailServiceBindings.EMAIL_TRANSPORT_PORT)
    .to(Number(process.env.EMAIL_TRANSPORT_PORT));
  app
    .bind(EmailServiceBindings.EMAIL_SENDER_USER)
    .to(process.env.EMAIL_SENDER_NAME);
  app
    .bind(EmailServiceBindings.EMAIL_SENDER_PASSWORD)
    .to(process.env.EMAIL_SENDER_PASSWORD);

  app.start();

  console.log('Listening queues');
}

main().catch(error => {
  console.error('Cannot start the applicatioin:', error);
  process.exit(1);
});
