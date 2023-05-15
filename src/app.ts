import {DBConnectionConfig, tastsQueuesConfig} from './datasources';
import {BaseListener, VerificationEmailListener} from './listeners';
import {EmailService, EmailServiceBindings} from './services';

type BindFunction = {
  to: (value: any) => void;
};

export default class Singleton {
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

    /* Setup the listeners */
    // TODO: Delete eslint-diables, they are temporal
    let listener: BaseListener; // eslint-disable-line

    // Set Verification Email listener
    listener = new VerificationEmailListener(this.dbConfig, emailService); // eslint-disable-line
    this.setListener(listener.getName(), listener);
  }
}
