import {EmailService} from '../../services';

export const givenServices = function () {
  const emailService = new EmailService('', 0, '', '');

  return {
    emailService,
  };
};
