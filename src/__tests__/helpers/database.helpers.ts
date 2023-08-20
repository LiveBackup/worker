import {Token} from '../../models';
import {TokenRepository} from '../../repositories';
import {userTestdb} from '../fixtures/datasources';

// Clear the testing database
export const givenEmptyDatabase = async function () {
  const {tokenRepository} = givenRepositories();

  await tokenRepository.deleteAll();
};

export const givenRepositories = function () {
  const tokenRepository = new TokenRepository(userTestdb);

  return {tokenRepository};
};

export const givenToken = function (data?: Partial<Token>): Token {
  return Object.assign(
    {
      id: '1',
      tokenSecret: '1',
      isOneUsageToken: false,
      allowedActions: ['Regular'],
      expirationDate: new Date(new Date().valueOf() + 3600000),
    },
    data,
  ) as Token;
};
