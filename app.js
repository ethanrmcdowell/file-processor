const inquirer = require('inquirer');
const crypto = require('crypto');
const fs = require('fs');

// ----------------------------------------------
//           TO DO & NOTES:
// ----------------------------------------------
// figure out what to do with directories:
// UPDATE: folder names being pushed to directoryList array
// ----------------------------------------------
// implement inquirer for command line UI
// UPDATE: asks user for entry upon starting app.js
// ----------------------------------------------
// md5 hash of pdf and jpg files
// UPDATE: will detect pdf/jpg files and print hash
// ----------------------------------------------
// combine into object -> csv file
// UPDATE: created class for fileinfo objects
// ----------------------------------------------

const directoryList = [];
// const md5sum = crypto.createHash('md5');

const initPrompt = {
  type: 'input',
  name: 'target',
  message: 'Enter required information:',
};

const init = async () => {
  userInput().then(scanFiles());
};

const userInput = async () => {
  await inquirer.prompt(initPrompt).then(async initRes => {
    const userRes = initRes.target;
    console.log('YOU ENTERED: ' + userRes);
  });
};

const scanFiles = () => {
  try {
    fs.readdirSync('./Target/').forEach((file, error) => {
      const boolDir = fs.lstatSync('./Target/' + file).isDirectory();
      const boolFile = fs.lstatSync('./Target/' + file).isFile();
      if (boolDir) {
        handleDir(file);
      } else if (boolFile) {
        const fileHex = fs
          .readFileSync('./Target/' + file)
          .toString('hex')
          .slice(0, 9);
        if (fileHex === '255044462') handlePdf(file);
        else if (fileHex.slice(0, 4) === 'ffd8') handleJpg(file);
      }
    });
  } catch (err) {
    console.log(err);
  } finally {
    // console.log('---- FIN ----');
    // console.log('DIRECTORIES: ' + directoryList);
  }
};

const handlePdf = async file => {
  const thisFile = await fs.readFileSync('./Target/' + file);
  const hash = crypto.createHash('md5').update(thisFile).digest('hex');
  console.log(file + ' / MD5 Hash: ' + hash);
  // console.log('PDF: ' + file);
};

const handleJpg = file => {
  // console.log('JPG: ' + file);
};

const handleDir = file => {
  // directoryList.push(file);
  // console.log('DIR: ' + file + '/');
};

init();
