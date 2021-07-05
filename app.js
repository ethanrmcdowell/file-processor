const inquirer = require('inquirer');
const fs = require('fs');

// --------------------------------------------------
//                  TO DO / NOTES:
// - Add better logic for subdir flag.
// - Add logic for ensuring target directory entered
//    by user has / at the end of directory name
// - Map user input to target and output pathing
// --------------------------------------------------

const methods = require('./methods/methods.js');

let subdirFlag = false;
let targetDir = '';
let outputPath = '';
let csvText = '';

const init = async () => {
  try {
    await userInput();
    await methods.scanTarget(targetDir, subdirFlag);
  } catch (err) {
    console.log(err);
  } finally {
    try {
      methods.fileList.forEach(file => {
        csvText += file.path + ', ' + file.type + ', ' + file.md5 + '\r\n';
      });
    } finally {
      fs.writeFile(outputPath, csvText, 'utf8', err => {
        if (err) {
          console.log(err);
        } else {
          console.log('CSV file written to: ' + outputPath);
          console.log('Output Length:' + methods.fileList.length);
        }
      });
    }
  }
};

const userInput = async () => {
  await inquirer.prompt(methods.initPrompt).then(async initRes => {
    const userRes = initRes.target;
    const inputArray = userRes.split(' ');
    targetDir = inputArray[0];
    targetLength = targetDir.length;
    const lastChar = targetDir.charAt(targetLength - 1);
    if (lastChar !== '/') {
      targetDir = targetDir + '/';
    }
    outputPath = inputArray[1];
    if (inputArray[2] === 'r') {
      subdirFlag = true;
    }
  });
};

init();

// /Users/ethanmcdowell/Projects/file-scanner/Target /Users/ethanmcdowell/Projects/file-scanner/Output/output.csv r
