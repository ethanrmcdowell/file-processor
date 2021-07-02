const inquirer = require('inquirer');
const crypto = require('crypto');
const fs = require('fs');

// ----------------------------------------------
//           TO DO & NOTES:
// ----------------------------------------------
// figure out what to do with directories:
// UPDATE: so far have directoryList array where each
// directory gets placed - will create further logic later.
// ----------------------------------------------
// implement inquirer for command line UI
// ----------------------------------------------
// md5 hash of pdf and jpg files
// ----------------------------------------------
// combine into object -> csv file
// ----------------------------------------------

const directoryList = [];
const md5sum = crypto.createHash('md5');

const init = () => {
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
