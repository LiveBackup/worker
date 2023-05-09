import {DBConnectionConfig} from '../../../datasources';
import {getTestTasksQueuesConfig} from '../../fixtures/datasources';
import {TestBaseListener} from '../../fixtures/listeners';
import {expect} from 'chai';

describe('Unit Testing - Base Listener', () => {
  const listenerName = 'TestListener';
  let tasksQueuesConfig: DBConnectionConfig;
  let baseListener: TestBaseListener;

  before(async () => {
    tasksQueuesConfig = await getTestTasksQueuesConfig();
    baseListener = new TestBaseListener(listenerName, tasksQueuesConfig);
  });

  it('Has a name', async () => {
    expect(baseListener.getName()).to.be.equal(listenerName);
  });
});
