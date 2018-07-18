
/* 
 * FILENAME:    tests.js
 * DESC:        write any tests that much be asserted for this problem to
 *              be considered successfully completed
 * TEST RUNNER: mocha/chai.js
 */
var assert = require('assert');


describe('Numbers', function(){
  describe("#max2(a, b)", function() {
    it('should return the maximum' , function() {
      assert.equal(max2(2, 9), 9);
    });
    it('should return the maximum' , function() {
      assert.equal(max2(10, 3), 10);
    });
    it('should return the maximum' , function() {
      assert.equal(max2(10, 10), 10);
    });
    it('should return the maximum' , function() {
      assert.equal(max2(2.5, (5/2)), 2.5);
    });
    it('should return the maximum' , function() {
      assert.equal(max2(92, 9), 92);
    });
  })
})

