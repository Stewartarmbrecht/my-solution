require('dotenv').config();
const shell = require('shelljs');
const pushPL = require('./amplify-push-payload');
const cmdPush =
  'amplify push --amplify "' +
  JSON.stringify(pushPL.amplify).replaceAll('"', '\\"') +
  '" --frontend "' +
  JSON.stringify(pushPL.frontend).replaceAll('"', '\\"') +
  '" --providers "' +
  JSON.stringify(pushPL.providers).replaceAll('"', '\\"') +
  '" --yes';

if (shell.exec(cmdPush).code !== 0) {
  shell.echo('Error amplify push failed.');
  shell.exit(1);
}
  