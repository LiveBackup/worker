import {Queue} from 'bullmq';
import {expect} from 'chai';
import sinon from 'sinon';
import App from '../../app';
import {TokensCleanupListener} from '../../listeners/tokens-cleanup.listener';
import {EmailService} from '../../services';
import {TokenService, TokenServiceBindings} from '../../services/token.service';
import {givenQueue, givenRunningApp} from '../helpers/app.helper';

describe('e2e - Verification Email Listener', () => {
  // Sinnon sandbox
  const sandbox = sinon.createSandbox();

  // App components under test
  let app: App;
  let tokensCleanupListener: TokensCleanupListener;
  let tokenService: TokenService;

  // Tests utilities
  let queue: Queue;

  before(async () => {
    app = await givenRunningApp();

    tokensCleanupListener = app.getListener(
      'TokensCleanup',
    ) as TokensCleanupListener;

    tokenService = app.getBinding<EmailService>(
      TokenServiceBindings.TOKEN_SERVICE,
    );
  });

  beforeEach(async () => {
    queue = await givenQueue(tokensCleanupListener.name);
  });

  after(async () => {
    await app.stop();
  });

  afterEach(async () => {
    sandbox.restore();
    await queue.close();
  });

  it('Clean all expired tokens', async () => {
    const cleanupTokensSpy = sinon.spy(tokenService, 'removeExpiredTokens');

    const finished = new Promise(resolve => {
      tokensCleanupListener.worker.on('completed', () => {
        resolve(true);
      });
    });

    queue.add('Delete tokens', {});

    expect(await finished).to.be.equals(true);
    expect(cleanupTokensSpy.calledOnce).to.be.equal(true);
    expect(cleanupTokensSpy.calledOnceWithExactly()).to.be.equals(true);
  });
});
