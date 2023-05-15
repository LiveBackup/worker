import App from '../../app';
import {getTestTasksQueuesConfig} from '../fixtures/datasources';

export const givenRunningWorker = async function () {
  const worker = new App();
  worker.setDbConfig(await getTestTasksQueuesConfig());
  worker.start();
};
