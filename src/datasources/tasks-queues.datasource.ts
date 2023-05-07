import { DBConnectionConfig } from ".";

export const tastsQueuesConfig: DBConnectionConfig = {
  name: 'tasks_queues',
  host: process.env.TASKS_QUEUE_HOST ?? 'localhost',
  port: Number(process.env.TASKS_QUEUE_PORT ?? 6379),
  db: Number(process.env.USER_DB_DATABASE ?? 0),
  user: process.env.USER_DB_USER,
  password: process.env.TASKS_QUEUE_PASSWORD,
};
