
/* 
 * FILENAME:    tests.js
 * DESC:        write any tests that much be asserted for this problem to
 *              be considered successfully completed
 * TEST RUNNER: mocha/chai.js
 */
    
//var assert = require('assert');

describe('BASICS I', function(){
  describe("addTwoNumbers(a, b)", function() {
    it('addTwoNumbers(2,9) should return 11' , function() {
      chai.assert.equal(addTwoNumbers(2, 9), 11);
    });
    it('addTwoNumbers(10,3) should return 13' , function() {
      chai.assert.equal(addTwoNumbers(10, 3), 13);
    });
    it('addTwoNumbers(0,0) should return 0' , function() {
      chai.assert.equal(addTwoNumbers(0, 0), 0);
    });
    it('addTwoNumbers(2.5,-3) should return -0.5.' , function() {
      chai.assert.equal(addTwoNumbers(2.5, (-3)), -0.5);
    });
    it('addTwoNumbers(-92,-9) should return -101' , function() {
      chai.assert.equal(addTwoNumbers((-92), (-9)), (-101));
    });
  });
  
  describe("turnNumberToString(a)", function() {
    it('turnNumberToString(11) should return "11"' , function() {
      chai.assert.equal(turnNumberToString(11), '11');
    });
    it('turnNumberToString(0) should return "0"' , function() {
      chai.assert.equal(turnNumberToString(0), '0');
    });
    it('turnNumberToString("5") should return "5"' , function() {
      chai.assert.equal(turnNumberToString('5'), '5');
    });
    it('turnNumberToString("test") should return "test"' , function() {
      chai.assert.equal(turnNumberToString('test'), 'test');
    });
    it('turnNumberToString(-5) should return "-5"' , function() {
      chai.assert.equal(turnNumberToString(-5), '-5');
    });
  });
  
  describe("fullName(firstName, lastName)", function() {
    it('fullName("John", "Doe") should return "John Doe"' , function() {
      chai.assert.equal(fullName("John", "Doe"), 'John Doe');
    });
    it('fullName("2", "17") should return "2 17"' , function() {
      chai.assert.equal(fullName("2", "17"), '2 17');
    });
    it('fullName("Johnny", "3") should return "Johnny 3"' , function() {
      chai.assert.equal(fullName("Johnny", "3"), 'Johnny 3');
    });
    it('fullName("Johnny", 3) should return "Johnny 3"' , function() {
      chai.assert.equal(fullName("Johnny", 3), 'Johnny 3');
    });
    it('fullName() should return "undefined undefined"' , function() {
      chai.assert.equal(fullName(), 'undefined undefined');
    });
  });
  
  describe("fullNameSentence(firstName, lastName, restOfSentence)", function() {
    it('fullNameSentence("John", "Smith", "is awesome") should return "John Smith is awesome"', function() {
      chai.assert.equal(fullNameSentence("John","Smith","is awesome"), 'John Smith is awesome');
    });
    it('fullNameSentence("John", "Smith") should return "John Smith undefined"', function() {
      chai.assert.equal(fullNameSentence("John","Smith"), 'John Smith undefined');
    });
    it('fullNameSentence("John", "", "is awesome") should return "John  is awesome"', function() {
      chai.assert.equal(fullNameSentence("John",'',"is awesome"), 'John  is awesome');
    });
    it('fullNameSentence("Johnny", 3) should return "Johnny 3 undefined"' , function() {
      chai.assert.equal(fullNameSentence("Johnny", 3), 'Johnny 3 undefined');
    });
    it('fullNameSentence() should return "undefined undefined undefined"' , function() {
      chai.assert.equal(fullNameSentence(), 'undefined undefined undefined');
    });
  });
  
  describe("fullNameSentenceWithChecks(firstName, lastName, restOfSentence)", function() {
    it('fullNameSentenceWithChecks("John", "Smith", "is awesome") should return "John Smith is awesome"', function() {
      chai.assert.equal(fullNameSentenceWithChecks("John","Smith","is awesome"), 'John Smith is awesome');
    });
    it('fullNameSentenceWithChecks("John", "Smith") should return "Required variables are not set!"', function() {
      chai.assert.equal(fullNameSentenceWithChecks("John","Smith"), 'Required variables are not set!');
    });
    it('fullNameSentenceWithChecks("John") should return "Required variables are not set!"', function() {
      chai.assert.equal(fullNameSentenceWithChecks("John"), 'Required variables are not set!');
    });
    it('fullNameSentenceWithChecks() should return "Required variables are not set!"', function() {
      chai.assert.equal(fullNameSentenceWithChecks(), 'Required variables are not set!');
    });
  });
  
  describe("fToC(f)", function() {
    it('fToC(32) should return 0', function() {
      chai.assert.equal(fToC(32),0);
    });
   it('fToC(212) should return 100', function() {
      chai.assert.equal(fToC(212),100);
    });
    it('fToC(-49) should return -45', function() {
      chai.assert.equal(fToC(-49),-45);
    });
      
  });
  
  describe("fToKelvin(f)", function() {
    it('fToKelvin(32) should return 273.15', function() {
        chai.assert.equal(fToKelvin(32), 273.15);
    });
    it('fToKelvin(212) should return 373.15', function() {
        chai.assert.equal(fToKelvin(212), 373.15);
    });
    it('fToKelvin(5) should return 258.15', function() {
        chai.assert.equal(fToKelvin(5), 258.15);
    });
      
  });
  
  describe("ftoKelvinWithChecks(f)", function() {
    it('fToKelvinWithChecks(32) should return 273.15', function() {
        chai.assert.equal(fToKelvinWithChecks(32),273.15);
    });
    it('fToKelvinWithChecks() should return "ERROR: variable `f` is not set"' , function() { //how do i replace ` with ' ?
        chai.assert.equal(fToKelvinWithChecks(), "ERROR: variable 'f' is not set");
    });
    it('fToKelvinWithChecks(212) should return 373.15', function() {
        chai.assert.equal(fToKelvinWithChecks(212),373.15);
    });
    it('fToKelvin(5) should return 258.15', function() {
        chai.assert.equal(fToKelvinWithChecks(5),258.15);
    });
    
  });
  
  
});


