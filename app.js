const inquirer = require('inquirer');
const crypto = require('crypto');
const fs = require('fs');

// TOMORROW:
// create switch statement for file sigs
// figure out what to do with directories
// implement inquirer for command line UI
// md5 hash of pdf and jpg files
// combine into object -> csv file

const init = () => {
  fs.readdirSync('./Target/').forEach(async (file, error) => {
    const boolDir = await fs.lstatSync('./Target/' + file).isDirectory();
    const boolFile = await fs.lstatSync('./Target/' + file).isFile();
    if (boolFile) {
      const fileHex = await fs
        .readFileSync('./Target/' + file)
        .toString('hex')
        .slice(0, 9);
      if (fileHex === '255044462') {
        handlePdf(file);
      }
    }
  });
};

const handlePdf = file => {
  console.log(file);
};

// const init = async () => {
//   console.log(
// await fs.readFileSync('./Letter.pdf').toString('hex').slice(0, 9)
//   );
// };

init();
