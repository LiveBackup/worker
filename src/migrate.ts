import {EmailVerificationTemplate} from './templates';
import * as fs from 'node:fs';

async function main() {
  const folder = './html';
  const templates = [
    {
      name: 'verifyEmail',
      template: new EmailVerificationTemplate('appUrl', 'token'),
    },
  ];

  // Remove folder if exists
  fs.rmSync(folder, {recursive: true, force: true});
  // Create the html folder
  fs.mkdirSync(folder);

  // Migrate the templates
  for (const {name, template} of templates) {
    console.log(`Migraing ${name} template`);
    const html = template.buildTemplate();
    fs.writeFileSync(`${folder}/${name}.html`, html);
  }

  console.log('All templates have been migrated');
  process.exit(0);
}

main().catch(error => {
  console.error(`Error migrating the http templates: ${error.message}`);
  process.exit(1);
});
