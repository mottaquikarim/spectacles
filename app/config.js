// npm level imports
const path = require('path');

const config = {};

// retrieve app root
config.PATH = path.resolve(__dirname + "/..");

// set the content root
config.CONTENT = `${config.PATH}/content`;

// set files to create under each problem
config.TEMPLATES = {
    "prompt.js": `
/* 
 * FILENAME:    prompt.js
 * DESC:        write any starter code required here 
 */

// EXAMPLE: pls remove
/*
    @func addTwoNumbers
    @param {number} a
    @param {number} b
    @returns {number}
    @desc - adds two numbers and returns the result
    
    @example addTwoNumbers(1,2) // 3
    @example addTwoNumbers(1) // 1
*/

function addTwoNumbers (a,b){
    return (a + b)
}
    `,
    "tests.js": `
/* 
 * FILENAME:    tests.js
 * DESC:        write any tests that much be asserted for this problem to
 *              be considered successfully completed
 * TEST RUNNER: mocha/chai.js
 */

// EXAMPLE: pls remove
describe('BasicsI', function(){
  describe("#addTwoNumbers(a, b)", function() {
    it('should return the sum' , function() {
      chai.assert.equal(addTwoNumbers(2, 9), 11);
    });

    it('should return the sum' , function() {
      chai.assert.equal(addTwoNumbers(3), 3);
    });
  })
})
    `,
    "background.md": `
# Name

background info / intro

any other relevant / pertinent information
    `,
    "meta.json": `{},`
};

config.CONTENTRCNAME = '.contentrc';
config.CONTENTRC = `{
    "length": 0,
    "tagsDict": {}
}`;

module.exports = config;
