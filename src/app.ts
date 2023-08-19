import {
  BaseListener,
  PasswordRecoveryListener,
  TasksQueueConfig,
  VerificationEmailListener,
} from './listeners';
import {TokensCleanupListener} from './listeners/tokens-cleanup.listener';
import {EmailService, EmailServiceBindings} from './services';

type BindFunction = {
  to: (value: any) => void;
};

export default class App {
  protected bindings: {[key: string]: any};
  protected listeners: {[listener: string]: BaseListener};

  constructor() {
    this.bindings = {};
    this.listeners = {};
  }

  getBinding<BindingType>(key: string): any {
    return this.bindings[key] as BindingType;
  }

  bind(key: string): BindFunction {
    return {
      to: (value: any) => {
        this.bindings[key] = value;
      },
    };
  }

  getListener(listenerName: string): BaseListener {
    return this.listeners[listenerName];
  }

  setListener(listenerName: string, listener: BaseListener) {
    this.listeners[listenerName] = listener;
  }

  start() {
    // Get the tasksQueues configuration
    const tasksQueuesConfig = this.getBinding<TasksQueueConfig>(
      'datasources.tasksQueues.config',
    );

    /* Setup the services */
    // Setup the email service
    const emailService = new EmailService(
      this.getBinding<string>(EmailServiceBindings.EMAIL_TRANSPORT_HOST),
      this.getBinding<number>(EmailServiceBindings.EMAIL_TRANSPORT_PORT),
      this.getBinding<string>(EmailServiceBindings.EMAIL_SENDER_USER),
      this.getBinding<string>(EmailServiceBindings.EMAIL_SENDER_PASSWORD),
    );
    this.bind(EmailServiceBindings.EMAIL_SERVICE).to(emailService);

    /* Setup the listeners */
    let listener: BaseListener;

    // Set Verification Email listener
    listener = new VerificationEmailListener(tasksQueuesConfig, emailService);
    this.setListener(listener.name, listener);

    // Set Password Recovery listener
    listener = new PasswordRecoveryListener(tasksQueuesConfig, emailService);
    this.setListener(listener.name, listener);

    // Set Tokens Cleanup listener
    listener = new TokensCleanupListener(tasksQueuesConfig);
    this.setListener(listener.name, listener);
  }

  async stop() {
    for (const listener of Object.values(this.listeners)) {
      await listener.worker.close();
    }
  }
}
