import {DBConnectionConfig, tastsQueuesConfig} from './datasources';
import {
  BaseListener,
  PasswordRecoveryListener,
  VerificationEmailListener,
} from './listeners';
import {EmailService, EmailServiceBindings} from './services';

type BindFunction = {
  to: (value: any) => void;
};

export default class App {
  protected dbConfig: DBConnectionConfig;
  protected bindings: {[key: string]: any};
  protected listeners: {[listener: string]: BaseListener};

  constructor() {
    this.dbConfig = tastsQueuesConfig;
    this.bindings = {};
    this.listeners = {};
  }

  getDbConfig(): DBConnectionConfig {
    return this.dbConfig;
  }

  setDbConfig(config: DBConnectionConfig) {
    this.dbConfig = config;
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
    listener = new VerificationEmailListener(this.dbConfig, emailService);
    this.setListener(listener.name, listener);

    // Set Password Recovery listener
    listener = new PasswordRecoveryListener(this.dbConfig, emailService);
    this.setListener(listener.name, listener);
  }

  async stop() {
    for (const listener of Object.values(this.listeners)) {
      await listener.worker.close();
    }
  }
}
