require('dotenv').config();
const shell = require('shelljs');

const cmdPush = 'npx renamer --dry-run --find my- --replace ' + process.argv[2] + '- **/*';

if (shell.exec(cmdPush).code !== 0) {
  shell.echo('Error replacing file and directory names.');
  shell.exit(1);
}

const replace = require('replace-in-file');
const options = {
  files: '**/*',
  from: /my\-/g,
  to: process.argv[2] + '-',
  dry: true,
};

try {
  const results = replace.sync(options);
  console.log('Replacement results:', results);
}
catch (error) {
  console.error('Error occurred:', error);
}