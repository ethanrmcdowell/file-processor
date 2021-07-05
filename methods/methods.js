const fs = require('fs');
const crypto = require('crypto');

const FileInfo = require('../lib/FileInfo');

// INQUIRER INFORMATION FOR USER PROMPT

const initPrompt = {
  type: 'input',
  name: 'target',
  message: 'Enter required information:',
};

const fileList = [];

// THIS FUNCTION SCANS EVERYTHING IN THE TARGET DIRECTORY AND SENDS THE FILE
// OFF TO THE FILE HANDLER FUNCTION, IF THERE ARE ANY DIRECTORIES

const scanTarget = async (targetPath, subdirFlag) => {
  // console.log('Target Path: ' + targetPath);
  await fs.readdirSync(targetPath).forEach(async (file, error) => {
    const boolDir = fs.lstatSync(targetPath + file).isDirectory();
    const boolFile = fs.lstatSync(targetPath + file).isFile();
    if (boolDir && subdirFlag) {
      handleSubdir(targetPath, file);
    } else if (boolFile) {
      fileHex(targetPath, file);
    } else {
      return;
    }
  });
};

const fileHex = (targetPath, file) => {
  const fileHex = fs
    .readFileSync(targetPath + file)
    .toString('hex')
    .slice(0, 9);
  if (fileHex === '255044462') handlePdf(targetPath, file);
  else if (fileHex.slice(0, 4) === 'ffd8') handleJpg(targetPath, file);
};

const handleSubdir = async (targetPath, file) => {
  const newTarget = targetPath + file + '/';
  scanTarget(newTarget, true);
};

const handlePdf = (targetPath, file) => {
  const thisFile = fs.readFileSync(targetPath + file);
  const hash = crypto.createHash('md5').update(thisFile).digest('hex');
  const newFileInfo = new FileInfo(targetPath + file, '.pdf', hash);
  fileList.push(newFileInfo);
};

const handleJpg = (targetPath, file) => {
  const thisFile = fs.readFileSync(targetPath + file);
  const hash = crypto.createHash('md5').update(thisFile).digest('hex');
  const newFileInfo = new FileInfo(targetPath + file, '.jpg', hash);
  fileList.push(newFileInfo);
};

exports.initPrompt = initPrompt;
exports.scanTarget = scanTarget;
exports.fileList = fileList;