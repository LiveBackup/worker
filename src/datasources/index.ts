export type DBConnectionConfig = {
  name: string,
  host: string,
  port: number,
  db: number,
  user?: string,
  password?: string,
};

export * from './tasks-queues.datasource';
