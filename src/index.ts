import Worker from './worker'
import dotenv from 'dotenv';

dotenv.config();

async function main() {
  const worker = new Worker();
  worker.boot();
}

main().catch((error) => {
  console.error('Cannot start the applicatioin:', error);
  process.exit(1);
});
