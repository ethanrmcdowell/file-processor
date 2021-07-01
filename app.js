const inquirer = require('inquirer');
const fs = require('fs');
const FileType = require('file-type');

const init = () => {
  fs.readdirSync('./').forEach(async file => {
    if (file === '.DS_Store' || file === 'app.js') {
      return;
    } else {
      const thisFile = await FileType.fromFile(file);
      console.log(thisFile.ext);
    }
  });
};

// const init = async () => {
//   console.log(await fs.readdirSync(__dirname));
// };

// console.log(await FileType.fromFile(file));

init();
