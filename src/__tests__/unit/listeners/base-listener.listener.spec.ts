import {Job} from 'bullmq';
import {expect} from 'chai';
import {DBConnectionConfig} from '../../../datasources';
import {getTestTasksQueuesConfig} from '../../fixtures/datasources';
import {TestBaseListener} from '../../fixtures/listeners';
import {givenJob} from '../../helpers/app.helper';

describe('Unit Testing - Base Listener', () => {
  const listenerName = 'TestListener';
  let tasksQueuesConfig: DBConnectionConfig;
  let baseListener: TestBaseListener;

  before(async () => {
    tasksQueuesConfig = await getTestTasksQueuesConfig();
    baseListener = new TestBaseListener(listenerName, tasksQueuesConfig);
  });

  after(async () => {
    await baseListener.worker.close();
  });

  it('Has a name', async () => {
    expect(baseListener.name).to.be.equal(listenerName);
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

  it('Handle an error when job fails', async () => {
    const job = await givenJob('Dummy', {});
    const expectedError = new Error('Could not process the job');

    let error = '';
    console.error = err => {
      error = err;
    };

    baseListener.handleError(job, expectedError);

    expect(error).to.be.equals(expectedError.message);
  });
});
