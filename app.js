const inquirer = require('inquirer');
const crypto = require('crypto');
const fs = require('fs');

const FileInfo = require('./lib/FileInfo');

// ----------------------------------------------
//           TO DO & NOTES:
// ----------------------------------------------
// Take fileList objects and write into csv file
// ----------------------------------------------
// Separate input into path, file type, and md5
// ----------------------------------------------

const directoryList = [];
const fileList = [];

const initPrompt = {
  type: 'input',
  name: 'target',
  message: 'Enter required information:',
};

const init = () => {
  userInput();
};

const userInput = async () => {
  await inquirer.prompt(initPrompt).then(async initRes => {
    const userRes = initRes.target;
    console.log(userRes.split(/[ ,]+/));
  });
  scanFiles();
};

const scanFiles = async () => {
  try {
    await fs.readdirSync('./Target/').forEach((file, error) => {
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
    createCsv();
  }
};

const handlePdf = async file => {
  const thisFile = await fs.readFileSync('./Target/' + file);
  const hash = crypto.createHash('md5').update(thisFile).digest('hex');
  const newFileInfo = new FileInfo('./Target/' + file, '.pdf', hash);
  fileList.push(newFileInfo);
};

const handleJpg = async file => {
  const thisFile = await fs.readFileSync('./Target/' + file);
  const hash = crypto.createHash('md5').update(thisFile).digest('hex');
  const newFileInfo = new FileInfo('./Target/' + file, '.jpg', hash);
  fileList.push(newFileInfo);
};

const createCsv = () => {
  console.log(__dirname);
  console.log(fs.readdirSync('/users/ethanmcdowell/Projects'));
  // for (let i = 0; i < fileList.length; i++) {
  //   console.log(
  //     fileList[i].path + ',' + fileList[i].type + ',' + fileList[i].md5
  //   );
  // }
};

const handleDir = file => {
  // directoryList.push(file);
  // console.log('DIR: ' + file + '/');
};

init();
