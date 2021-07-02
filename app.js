const inquirer = require('inquirer');
const crypto = require('crypto');
const fs = require('fs');

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
        console.log('**PDF: ' + file);
      }
    }
  });
};

// const init = async () => {
//   console.log(
// await fs.readFileSync('./Letter.pdf').toString('hex').slice(0, 9)
//   );
// };

init();
