import {RedisMemoryServer} from 'redis-memory-server';
import {TasksQueueConfig} from '../../../listeners';

const testRedisDB = new RedisMemoryServer();

export const getTestTasksQueuesConfig =
  async function (): Promise<TasksQueueConfig> {
    return {
      name: 'test-tasks-queues',
      host: await testRedisDB.getHost(),
      port: await testRedisDB.getPort(),
      db: 0,
    };
  };
