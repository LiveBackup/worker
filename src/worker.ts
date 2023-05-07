import {DBConnectionConfig, tastsQueuesConfig} from './datasources';
import {BaseListener, VerificationEmailListener} from './listeners';

export default class Worker {
  protected dbConfig: DBConnectionConfig;
  protected listeners: { [listener: string]: BaseListener };

  constructor() {
    this.dbConfig = tastsQueuesConfig;
    this.listeners = {};
  }

  getDbConfig(): DBConnectionConfig {
    return this.dbConfig;
  }

  setDbConfig(config: DBConnectionConfig) {
    this.dbConfig = config;
  }

  boot() {
    // let listener:BaseListener;

    // Set Verification Email listener
    const listener = new VerificationEmailListener(this.dbConfig);
    this.setListener(listener.getName(), listener);
  }

  getListener(listenerName: string): BaseListener {
    return this.listeners[listenerName];
  }

  setListener(listenerName: string, listener: BaseListener) {
    this.listeners[listenerName] = listener;
  }
}
