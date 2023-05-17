import {RedisMemoryServer} from 'redis-memory-server';
import {DBConnectionConfig} from '../../../datasources';

const testRedisDB = new RedisMemoryServer();

export const getTestTasksQueuesConfig =
  async function (): Promise<DBConnectionConfig> {
    return {
      name: 'test-tasks-queues',
      host: await testRedisDB.getHost(),
      port: await testRedisDB.getPort(),
      db: 0,
    };
  };
