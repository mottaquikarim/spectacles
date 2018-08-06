export const SPEC_DEFAULTS = [{
    name: "background.md",
    content: `
# Name

Add any and all background / context / requirements needed to solve this poblem here.
    `,
}, {
    name: "meta.json",
    content: `{"tags": ["REMOVE_ME"],"title": ""}`,
}, {
    name: "prompt.js",
    content: `
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
}, {
    name: "tests.js",
    content: `
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
}];
