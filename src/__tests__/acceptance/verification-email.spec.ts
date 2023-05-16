import {givenJob, givenRunningApp} from '../helpers/app.helper';
import App from '../../app';
import {VerificationEmailListener} from '../../listeners';
import sinon from 'sinon';
import {EmailService, EmailServiceBindings} from '../../services';
import {expect} from 'chai';

describe('e2e - Verification Email Listener', () => {
  const sandbox = sinon.createSandbox();
  let app: App;
  let verificationEmailListener: VerificationEmailListener;
  let emailService: EmailService;

  let error: string;

  beforeEach(async () => {
    app = await givenRunningApp();
    verificationEmailListener = app.getListener(
      'VerificationEmail',
    ) as VerificationEmailListener;
    emailService = app.getBinding<EmailService>(
      EmailServiceBindings.EMAIL_SERVICE,
    );

    error = '';
    console.error = err => {
      error += `${err}\n`;
    };
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('Sends a verification email', async () => {
    const sendEmailVerificationSpy = sinon.spy(
      emailService,
      'sendVerificationEmail',
    );
    const sendEmailStub = sinon
      .stub(emailService.transport, 'sendMail')
      .callsFake(async () => {
        return 'Email sent';
      });

    const emailJob = await givenJob('Verification email', {
      email: 'test@gmail.com',
      token: 'token123',
    });
    await verificationEmailListener.executeJob(emailJob);

    expect(sendEmailVerificationSpy.calledOnce).to.be.equal(true);
    expect(
      sendEmailVerificationSpy.calledOnceWithExactly(
        'https://localhost:3000',
        'test@gmail.com',
        'token123',
      ),
    );
    expect(sendEmailStub.calledOnce).to.be.equal(true);
  });

  it('Handle a failure sending the email', async () => {
    const sendEmailStub = sinon
      .stub(emailService.transport, 'sendMail')
      .throws(new Error('Email could not been sent'));

    const emailJob = await givenJob('Verification email', {
      email: 'test@gmail.com',
      token: 'token123',
    });
    await verificationEmailListener.executeJob(emailJob);

    expect(sendEmailStub.calledOnce).to.be.equal(true);
    expect(sendEmailStub.threw()).to.be.equal(true);
    expect(error).to.be.equals(
      'Could not send verification email: Email could not been sent\n',
    );
  });
});
