const assert = require('chai').assert;
const inquirer = require('inquirer');
const methods = require('../methods/methods.js');

describe('Directory Tests', async () => {
  let res = await methods.testScan(__dirname + '/test-case/', true);
  it('Test directory should return an array of file objects', () => {
    assert.isArray(res);
  });
  it('Should scan all four files in the test directories', () => {
    assert(4, res.length);
  });
  it('Create CSV file with data to test directory', async () => {
    let write = await methods.testWrite(res);
    assert(write, true);
  });
});
