require('dotenv').config();
const shell = require('shelljs');
const initPL = require('./amplify-init-payload');
const configCmd =
  'amplify init --amplify "' +
  JSON.stringify(initPL.amplify).replaceAll('"', '\\"') +
  '" --frontend "' +
  JSON.stringify(initPL.frontend).replaceAll('"', '\\"') +
  '" --providers "' +
  JSON.stringify(initPL.providers).replaceAll('"', '\\"') +
  '" --yes';
  
if (shell.exec(configCmd).code !== 0) {
  shell.echo('Error amplify init failed.');
  shell.exit(1);
}
