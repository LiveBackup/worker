import {TokenService} from '../services/token.service';
import {BaseListener, TasksQueueConfig} from './base.listener';

export class TokensCleanupListener extends BaseListener {
  protected tokenService: TokenService;

  constructor(tasksQueuesConfig: TasksQueueConfig, tokenService: TokenService) {
    super('TokensCleanup', tasksQueuesConfig);
    this.tokenService = tokenService;
  }

  async executeJob(): Promise<void> {
    await this.tokenService.removeExpiredTokens();
  }
}
