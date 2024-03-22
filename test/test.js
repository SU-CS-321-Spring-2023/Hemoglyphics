// test/utils.test.js

const assert = require('assert');
const utils = require('../utils'); // Path to the module being tested

describe('Utils', () => {
  describe('#add()', () => {
    it('should add two numbers correctly', () => {
      assert.strictEqual(utils.add(1, 2), 3);
    });
  });

  describe('#multiply()', () => {
    it('should multiply two numbers correctly', () => {
      assert.strictEqual(utils.multiply(2, 3), 6);
    });
  });
});

