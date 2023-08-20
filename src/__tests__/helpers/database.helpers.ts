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
