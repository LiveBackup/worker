import {Count} from '@loopback/repository';
import {TokenRepository} from '../repositories';

export namespace TokenServiceBindings {
  export const TOKEN_SERVICE = 'services.TokenService';
}

export class TokenService {
  protected tokenRepository: TokenRepository;

  constructor(tokenRepository: TokenRepository) {
    this.tokenRepository = tokenRepository;
  }

  async removeExpiredTokens(): Promise<Count> {
    return await this.tokenRepository.deleteAll({
      expirationDate: {
        lt: new Date(),
      },
    });
  }
}
