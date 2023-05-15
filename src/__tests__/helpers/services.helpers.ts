import {EmailService} from '../../services';

export const givenServices = function () {
  const emailService = new EmailService(
    'dist/__tests__/fixtures/html/',
    '',
    0,
    '',
    '',
  );

  return {
    emailService,
  };
};
