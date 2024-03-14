require('dotenv').config();
const shell = require('shelljs');

const solutionName = process.argv[2];
const companySlug = process.argv[3];
const ipAddress = process.argv[4];
const port = process.argv[5];

//const cmdPush = 'npx renamer --dry-run --find my- --replace ' + process.argv[2] + '- **/*';
const cmdPush = './claim-project.sh ' + solutionName;

if (shell.exec(cmdPush).code !== 0) {
  shell.echo('Error replacing file and directory names.');
  shell.exit(1);
}

const replace = require('replace-in-file');
let options = {
  files: '**/*',
  from: /my/g,
  to: process.argv[2].toLowerCase(),
  ignore: '**/package-lock.json',
  //dry: true,
};

try {
  const results = replace.sync(options);
  console.log('Replacement results:', results);
}
catch (error) {
  console.error('Error occurred:', error);
}

options = {
  files: '**/*',
  from: /My/g,
  to: process.argv[2],
  ignore: '**/package-lock.json',
  //dry: true,
};

try {
  const results = replace.sync(options);
  console.log('Replacement results:', results);
}
catch (error) {
  console.error('Error occurred:', error);
}

options = {
  files: '**/*',
  from: /stewartarmbrecht/g,
  to: companySlug.toLowerCase(),
  //dry: true,
};

try {
  const results = replace.sync(options);
  console.log('Replacement results:', results);
}
catch (error) {
  console.error('Error occurred:', error);
}

options = {
  files: '**/*',
  from: /10\.24\.1\.57/g,
  to: ipAddress.toLowerCase(),
  //dry: true,
};

try {
  const results = replace.sync(options);
  console.log('Replacement results:', results);
}
catch (error) {
  console.error('Error occurred:', error);
}

options = {
  files: '**/*',
  from: /19001/g,
  to: port.toLowerCase(),
  //dry: true,
};

try {
  const results = replace.sync(options);
  console.log('Replacement results:', results);
}
catch (error) {
  console.error('Error occurred:', error);
}