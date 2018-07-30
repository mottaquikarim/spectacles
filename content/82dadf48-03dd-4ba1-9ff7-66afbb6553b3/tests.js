var assert = chai.assert

/* 
 * FILENAME:    tests.js
 * DESC:        write any tests that much be asserted for this problem to
 *              be considered successfully completed
 * TEST RUNNER: mocha/chai.js
 */

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

//testing(time){} should return strings based on the following (assume all inputs will be >= 0)
//"just started" if time < 5
//"hustling" if 5 <= time < 25
//"almost there" if 25 <= time < 35
//"finishing" if 35 <= time < 40
//"done" if time >= 40

describe('Numbers', function(){
  describe("#testing(a, b)", function() {
    it('should return just started if time < 5' , function() {
      assert.equal(testing(4.9), "just started");
    });
    it('should return hustling if 5 <= time < 25' , function() {
      assert.equal(testing(5), "hustling");
    });
    it('should return hustling if 5 <= time < 25' , function() {
      assert.equal(testing(24.9999999), "hustling");
    });
    it('should return almost there if 25 <= time < 35' , function() {
      assert.equal(testing(25), "almost there");
    });
    it('should return almost there if 25 <= time < 35' , function() {
      assert.equal(testing(34.2), "almost there");
    });
    it('should return finishing if 35 <= time < 40' , function() {
      assert.equal(testing(35), "finishing") ;
    });
    it('should return finishing if 35 <= time < 40' , function() {
      assert.equal(testing(30), "finishing") ;
    });
    it('should return done if time >= 40' , function() {
      assert.equal(testing((40), "done")) ;
    });
    it('should return done if time >= 40' , function() {
      assert.equal(testing((10920238012), "done")) ;
    });
  })
})

//gradeConv(g){} converts numeric grade g into its letter grade equivalent, as follows:
//Note: g should be rouded accordingly before being converted into its letter grade
//A: 90-100
//B: 80-89
//C: 70-79
//D: 65-69
//F: 0-64
//Any other number --> "invalid grade"



describe('Numbers', function(){
  describe("#gradeConv(g)", function() {
    it('should return the converted version of the numeric grade' , function() {
      assert.equal(gradeConv(67), "D");
    });
    it('should return the proper "borderline" test cases such as D for 65', function() {
      assert.equal(gradeConv(89), "B");
    });
    it('should round any numbers up or down accordingly', function() {
      assert.equal(gradeConv(64.4), "F")
    });
    it('should round any numbers up or down accordingly', function() {
      assert.equal(gradeConv(69.5), "C")
    });
    it('should give "invalid grade" if does not fit into range from 0-100', function() {
      assert.equal(gradeConv(120), "invalid grade")
    });
    it('should give "invalid grade" if does not fit into range from 0-100', function() {
      assert.equal(gradeConv(-1), "invalid grade")
    });
    it('should be rounded before converted', function() {
      assert.equal(gradeConv(100.2), "A")
    });
  })
})

//XOR3(a, b, c){} takes Boolean inputs a, b, c and returns true if exactly one input is true, false otherwise.

describe('Booleans', function(){
  describe("#XOR3(a, b, c)", function() {
    it('should return true if exactly one input is true' , function() {
      assert.equal(XOR3(true, false, false), true);
    });
    it('should return true if exactly one input is true', function() {
      assert.equal(XOR3(false, true, false), true);
    });
    it('should return true if exactly one input is true', function() {
      assert.equal(XOR3(false, false, true), true)
    });
    it('should return false if two or more are true', function() {
      assert.equal(XOR3(true, false, true), false)
    });
    it('should return false if two or more are true', function() {
      assert.equal(XOR3(true, true, true), false)
    });
    it('should return false if none are true', function() {
      assert.equal(XOR3(false, false, false), false)
    });
  })
})

//Two step problem

//isLeapYear(year) returns true if year is a leap year, false otherwise, according to these rules:
//Generally, a year divisible by 4 is a leap year. However, century years are not leap years unless they are divisible by 400. (e.g., 1700, 1800, and 1900 were not leap years, but 1600 and 2000 were.)


describe('Numbers', function(){
  describe("#isLeapYear(year)", function() {
    it('should return true if it is a leap year ' , function() {
      assert.equal(isLeapYear(2004), true);
    });
    it('should return true if it is a leap year', function() {
      assert.equal(isLeapYear(2000), true);
    });
    it('should return false if it is a century not divisible by 400', function() {
      assert.equal(isLeapYear(1700), false);
    });
    it('should return false if it is a century not divisible by 400', function() {
      assert.equal(isLeapYear(1900), false);
    });
    it('should return false otherwise', function() {
      assert.equal(isLeapYear(1978), false);
    });
  })
})

//Now using isLeapYear(year), write the function daysInMonth(month, year) which will return the number of days in a month specified


describe('Numbers', function(){
  describe("#daysInMonth(month, year)", function() {
    it('should return correct number if it is a leap year' , function() {
      assert.equal(daysInMonth(1, 2000), 31);
    });
    it('should return correct number if it is a leap year' , function() {
      assert.equal(daysInMonth(2, 2000), 29);
    });
    it('should return correct number if it is a leap year' , function() {
      assert.equal(daysInMonth(3, 1600), 31);
    });
    it('should return correct number if it is not a leap year' , function() {
      assert.equal(daysInMonth(4, 1900), 30);
    });
    it('should return correct number if it is not a leap year' , function() {
      assert.equal(daysInMonth(5, 1803), 31);
    });
    it('should return correct number if it is not a leap year' , function() {
      assert.equal(daysInMonth(6, 1765), 30);
    });
    it('should return correct number if it is not a leap year' , function() {
      assert.equal(daysInMonth(7, 1009), 31);
    });
    it('should return correct number if it is not a leap year' , function() {
      assert.equal(daysInMonth(8, 1289), 31);
    });
    it('should return correct number if it is not a leap year' , function() {
      assert.equal(daysInMonth(9, 1289), 30);
    });
    it('should return correct number if it is not a leap year' , function() {
      assert.equal(daysInMonth(10, 1289), 31);
    });
    it('should return correct number if it is not a leap year' , function() {
      assert.equal(daysInMonth(11, 1289), 30);
    });
    it('should return correct number if it is not a leap year' , function() {
      assert.equal(daysInMonth(12, 1289), 31);
    });
  })
})

