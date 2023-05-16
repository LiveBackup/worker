import {BaseTemplate} from '../../../templates';

export class TestTemplate extends BaseTemplate {
  constructor() {
    super('Test', 'Test');
  }

  protected buildStyles(): string {
    return '.html {}';
  }

  protected buildBody(): string {
    return '<p>Hello world<p>';
  }
}
