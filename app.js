const inquirer = require('inquirer');
const crypto = require('crypto');
const fs = require('fs');

// --------------------------------------------------
//                  TO DO / NOTES:
// - Add better logic for subdir flag.
// - Add logic for ensuring target directory entered
//    by user has / at the end of directory name
// - Map user input to target and output pathing
// --------------------------------------------------

const methods = require('./methods/methods.js');

let subdirFlag = true;
let targetDir = __dirname + '/Target/';
let outputPath = '';
let csvText = '';

const init = async () => {
  try {
    // await userInput();
    await methods.scanTarget(targetDir, subdirFlag);
  } catch (err) {
    console.log(err);
  } finally {
    try {
      methods.fileList.forEach(file => {
        csvText += file.path + ', ' + file.type + ', ' + file.md5 + '\r\n';
      });
    } finally {
      fs.writeFile(targetDir + 'fileList.csv', csvText, 'utf8', err => {
        if (err) {
          console.log(err);
        } else {
          console.log('CSV file written to: ' + targetDir + 'fileList.csv');
        }
      });
    }
  }
};

const userInput = async () => {
  await inquirer.prompt(methods.initPrompt).then(async initRes => {
    const userRes = initRes.target;
    const inputLength = userRes.split(/[ ,]+/).length;
    targetDir = userRes.split(/[ ,]+/)[0] + '/';
    outputPath = userRes.split(/[ ,]+/)[1];
    if (inputLength === 3) {
      subdirFlag = true;
    }
  });
  console.log('Target Directory: ' + targetDir);
  console.log('Output Path: ' + outputPath);
  console.log('Scan subdirectories? ' + subdirFlag);
};

init();
