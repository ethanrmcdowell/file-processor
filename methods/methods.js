const fs = require('fs');
const crypto = require('crypto');

const FileInfo = require('../lib/FileInfo');

const validatePrompt = input => {
  if (input === '' || input.split(' ').length < 2) {
    return 'Please enter a valid response';
  } else {
    return true;
  }
};

const initPrompt = {
  type: 'input',
  name: 'target',
  message: 'Enter required information:',
  validate: validatePrompt,
};

const fileList = [];

const scanTarget = async (targetPath, subdirFlag) => {
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

const testScan = async (targetPath, subdirFlag) => {
  try {
    await scanTarget(targetPath, subdirFlag);
  } finally {
    return fileList;
  }
};

const testWrite = async testFiles => {
  let csvText = '';
  try {
    testFiles.forEach(file => {
      csvText += file.path + ', ' + file.type + ', ' + file.md5 + '\r\n';
    });
  } finally {
    try {
      await fs.writeFile('./test/test.csv', csvText, 'utf8', err => {
        if (err) {
          console.log(err);
        }
      });
    } finally {
      return true;
    }
  }
};

exports.initPrompt = initPrompt;
exports.scanTarget = scanTarget;
exports.fileList = fileList;
exports.testScan = testScan;
exports.testWrite = testWrite;
