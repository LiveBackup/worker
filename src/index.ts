import App from './app';
import {EmailServiceBindings} from './services';
import dotenv from 'dotenv';

dotenv.config();

async function main() {
  const app = new App();

  // Setup the email sender credentials
  app
    .bind(EmailServiceBindings.EMAIL_TRANSPORT_HOST)
    .to(process.env.EMAIL_TRANSPORT_HOST);
  app
    .bind(EmailServiceBindings.EMAIL_TRANSPORT_PORT)
    .to(Number(process.env.EMAIL_TRANSPORT_PORT));
  app
    .bind(EmailServiceBindings.EMAIL_SENDER_USER)
    .to(process.env.EMAIL_SENDER_NAME);
  app
    .bind(EmailServiceBindings.EMAIL_SENDER_PASSWORD)
    .to(process.env.EMAIL_SENDER_PASSWORD);

  app.start();

  console.log('Listening queues');
}

main().catch(error => {
  console.error('Cannot start the applicatioin:', error);
  process.exit(1);
});
