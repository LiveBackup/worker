import {expect} from 'chai';
import {TokenRepository} from '../../../repositories';
import {TokenService} from '../../../services/token.service';
import {
  givenEmptyDatabase,
  givenRepositories,
  givenToken,
} from '../../helpers/database.helpers';

describe('Unit Testing - Token Service', () => {
  // Repositories
  let tokenRepository: TokenRepository;
  // Services
  let tokenService: TokenService;

  before(() => {
    ({tokenRepository} = givenRepositories());
    tokenService = new TokenService(tokenRepository);
  });

  beforeEach(async () => {
    await givenEmptyDatabase();
  });

  describe('Remove expired tokens', () => {
    it('Does not remove tokens if there are not expired tokens', async () => {
      // Create some mock tokens
      const token1 = givenToken({id: '1'});
      const token2 = givenToken({id: '2'});
      const token3 = givenToken({id: '3'});

      //  Save the tokens in database
      await tokenRepository.createAll([token1, token2, token3]);

      // Call to remove expired tokens
      const deteletedTokens = await tokenService.removeExpiredTokens();
      expect(deteletedTokens.count).to.be.equal(0);
    });

    it('Cleans all token table if all have expired', async () => {
      const expirationDate = new Date();
      expirationDate.setHours(new Date().getHours() - 1);

      // Create some mock tokens
      const token1 = givenToken({id: '1', expirationDate});
      const token2 = givenToken({id: '2', expirationDate});
      const token3 = givenToken({id: '3', expirationDate});

      //  Save the tokens in database
      await tokenRepository.createAll([token1, token2, token3]);

      // Call to remove expired tokens
      const deteletedTokens = await tokenService.removeExpiredTokens();
      expect(deteletedTokens.count).to.be.equal(3);
    });

    it('Deletes expired tokens and keep valid tokens', async () => {
      const expirationDate = new Date();
      expirationDate.setHours(new Date().getHours() - 1);

      // Create some mock tokens
      const token1 = givenToken({id: '1'});
      const token2 = givenToken({id: '2'});
      const token3 = givenToken({id: '3', expirationDate});
      const token4 = givenToken({id: '4', expirationDate});

      //  Save the tokens in database
      await tokenRepository.createAll([token1, token2, token3, token4]);

      // Call to remove expired tokens
      const deteletedTokens = await tokenService.removeExpiredTokens();
      expect(deteletedTokens.count).to.be.equal(2);
    });
  });
});
