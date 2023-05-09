import {Job} from 'bullmq';
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

  it('Throws an exception when execute action is called', async () => {
    let expectedError: Error | undefined = undefined;

    try {
      await baseListener.executeJob({name: 'Mock'} as Job);
    } catch (error) {
      expectedError = error;
    }

    expect(expectedError).not.to.be.a('undefined');
    expect(expectedError?.message).to.be.equal(
      'Method not implemented. Cannot process: Mock',
    );
  });
});
