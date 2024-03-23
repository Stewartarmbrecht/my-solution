require('dotenv').config();
const shell = require('shelljs');
const pullPL = require('./amplify-pull-payload');
const cmdPull =
  'amplify pull --amplify "' +
  JSON.stringify(pullPL.amplify).replaceAll('"', '\\"') +
  '" --frontend "' +
  JSON.stringify(pullPL.frontend).replaceAll('"', '\\"') +
  '" --providers "' +
  JSON.stringify(pullPL.providers).replaceAll('"', '\\"') +
  '" --yes';

  shell.echo(cmdPull);
  
  if (shell.exec(cmdPull).code !== 0) {
  shell.echo('Error amplify pull failed.');
  shell.exit(1);
}
