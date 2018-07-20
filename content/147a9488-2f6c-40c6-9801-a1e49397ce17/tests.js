
/* 
 * FILENAME:    tests.js
 * DESC:        write any tests that much be asserted for this problem to
 *              be considered successfully completed
 * TEST RUNNER: mocha/chai.js
 */
    
  
var assert = require('assert');


describe('BasicsI', function(){
  describe("#addTwoNumbers(a, b)", function() {
    it('should return the sum' , function() {
      assert.equal(addTwoNumbers(2, 9), 11);
    });
    it('should return the sum' , function() {
      assert.equal(addTwoNumbers(10, 3), 13);
    });
    it('should return the sum' , function() {
      assert.equal(addTwoNumbers(10, 10), 20);
    });
    it('should return the sum' , function() {
      assert.equal(addTwoNumbers(0, -3), -3);
    });
    it('should return the sum' , function() {
      assert.equal(addTwoNumbers(3), 3);
    });
  })
})
