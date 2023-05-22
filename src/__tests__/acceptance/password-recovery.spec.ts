import {Queue} from 'bullmq';
import {expect} from 'chai';
import sinon from 'sinon';
import App from '../../app';
import {PasswordRecoveryListener} from '../../listeners';
import {EmailService, EmailServiceBindings} from '../../services';
import {givenQueue, givenRunningApp} from '../helpers/app.helper';

describe('e2e - Password Recovery Listener', () => {
  // Sinnon sandbox
  const sandbox = sinon.createSandbox();

  // App components under test
  let app: App;
  let passwordRecoveryListener: PasswordRecoveryListener;
  let emailService: EmailService;

  // Tests utilities
  let queue: Queue;

  beforeEach(async () => {
    app = await givenRunningApp();

    passwordRecoveryListener = app.getListener(
      'PasswordRecovery',
    ) as PasswordRecoveryListener;

    emailService = app.getBinding<EmailService>(
      EmailServiceBindings.EMAIL_SERVICE,
    );

    queue = await givenQueue(passwordRecoveryListener.name);
  });

  afterEach(async () => {
    sandbox.restore();
    await app.stop();
    await queue.close();
  });

  it('Sends a verification email', async () => {
    const sendPasswordRecoverySpy = sinon.spy(
      emailService,
      'sendPasswordRecoveryEmail',
    );
    const sendEmailStub = sinon
      .stub(emailService.transport, 'sendMail')
      .callsFake(async () => {
        return {accepted: ''};
      });

    const emailJob = {
      email: 'test@gmail.com',
      recoveryToken: 'token123',
    };

    const finished = new Promise(resolve => {
      passwordRecoveryListener.worker.on('completed', () => {
        resolve(true);
      });
    });

    queue.add('TestEmail', emailJob);

    expect(await finished).to.be.equals(true);
    expect(sendPasswordRecoverySpy.calledOnce).to.be.equal(true);
    expect(
      sendPasswordRecoverySpy.calledOnceWithExactly(
        'http://localhost:3000',
        'test@gmail.com',
        'token123',
      ),
    ).to.be.equals(true);
    expect(sendEmailStub.calledOnce).to.be.equal(true);
  });

  it('Handle a failure sending the email', async () => {
    const sendEmailStub = sinon
      .stub(emailService.transport, 'sendMail')
      .throws(new Error('Email could not been sent'));

    const emailJob = {
      email: 'test@gmail.com',
      accessToken: 'token123',
    };

    const errorPromise = new Promise(resolve => {
      sinon
        .stub(passwordRecoveryListener, 'handleError')
        .callsFake((_, err) => {
          resolve(err.message);
        });
    });

    await queue.add('Test', emailJob);

    const error = await errorPromise;
    expect(sendEmailStub.calledOnce).to.be.equal(true);
    expect(sendEmailStub.threw()).to.be.equal(true);
    expect(error).to.be.equals(
      'Could not send password recovery email: Email could not been sent',
    );
  }).timeout(5000);
});
