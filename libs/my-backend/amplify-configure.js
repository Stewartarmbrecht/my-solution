require('dotenv').config();
const shell = require('shelljs');
const configPL = require('./amplify-configure-payload');
const configCmd =
  'amplify configure project --amplify "' +
  JSON.stringify(configPL.amplify).replaceAll('"', '\\"') +
  '" --frontend "' +
  JSON.stringify(configPL.frontend).replaceAll('"', '\\"') +
  '" --providers "' +
  JSON.stringify(configPL.providers).replaceAll('"', '\\"') +
  '" --yes';
  
if (shell.exec(configCmd).code !== 0) {
  shell.echo('Error amplify configure failed.');
  shell.exit(1);
}
