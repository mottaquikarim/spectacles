
/* 
 * FILENAME:    tests.js
 * DESC:        write any tests that much be asserted for this problem to
 *              be considered successfully completed
 * TEST RUNNER: mocha/chai.js
 */



describe('Conditionals', function(){
  describe("#shouldTakeUmbrella()", function() {
    it('should return False if chance of rain is less than 50%' , function() {
      chai.assert.equal(shouldTakeUmbrella(40), false);
    });
    it('should return True if chance of rain is greater than 50%' , function() {
      chai.assert.equal(shouldTakeUmbrella(60), true);
    });
  })
})

