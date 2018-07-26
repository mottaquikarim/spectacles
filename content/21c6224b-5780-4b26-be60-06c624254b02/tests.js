
/* 
 * FILENAME:    tests.js
 * DESC:        write any tests that much be asserted for this problem to
 *              be considered successfully completed
 * TEST RUNNER: mocha/chai.js
 */
    
//var assert = require('assert');

describe('1. newShoppingListItem', () => {
    it('should return an object with item and price attributes', () => {
        const shoppingListItem = newShoppingListItem('test', 1)
        chai.assert.equal(shoppingListItem.item, 'test');
        chai.assert.equal(shoppingListItem.price, 1);
    });
});

console.log('hello');

describe('BASICS I', function(){
  describe("#addTwoNumbers(a, b)", function() {
    it('should return the sum' , function() {
      chai.assert.equal(addTwoNumbers(2, 9), 11);
    });
    it('should return the sum' , function() {
      chai.assert.equal(addTwoNumbers(10, 3), 13);
    });
    it('should return the sum' , function() {
      chai.assert.equal(addTwoNumbers(0, 0), 0);
    });
    it('should return the sum' , function() {
      chai.assert.equal(addTwoNumbers(2.5, (-3), (-5.5)));
    });
    it('should return the sum' , function() {
      chai.assert.equal(addTwoNumbers((-92), (-9), (-101)));
    });
  })
  
  describe("#addTwoNumbers(a, b)", function() {
    it('should return the sum' , function() {
      assert.equal(addTwoNumbers(2, 9), 11);
    });
    it('should return the sum' , function() {
      assert.equal(addTwoNumbers(10, 3), 13);
    });
    it('should return the sum' , function() {
      assert.equal(addTwoNumbers(0, 0), 0);
    });
    it('should return the sum' , function() {
      assert.equal(addTwoNumbers(2.5, (-3), (-5.5)));
    });
    it('should return the sum' , function() {
      assert.equal(addTwoNumbers((-92), (-9), (-101)));
    });
  })
})
})

d