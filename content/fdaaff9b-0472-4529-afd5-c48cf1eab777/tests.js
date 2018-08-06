describe('Conditionals', function(){
  describe("#isUndefined(a)", function() {
    it('should return false when passed an undefined value', function() {
      assert.equal(isUndefined(undefined), true);
    });
    it('should return true when passed any value other than undefined', function() {
      assert.equal(isUndefined(7), false);
    });
    it('should return true when passed any value other than undefined', function() {
      assert.equal(isUndefined("hello world"), false);
    });
    it('should return true when passed any value other than undefined', function() {
      assert.equal(isUndefined(true), false);
    });
    it('should return true when passed any value other than undefined', function() {
      assert.equal(isUndefined(null), false);
    });
  })
})


describe('Conditionals', function(){
  describe("#isNameTooLong(name)", function() {
    it('should return true when the length of name is greater than 16', function() {
      assert.equal(isNameTooLong('Mottaqui A. Karim'), true);
    });
    it('should return false when the length of name is less than 16', function() {
      assert.equal(isNameTooLong("John Smith"), false);
    });
    it('should return true when the length of name is equal to 16', function() {
      assert.equal(isNameTooLong("Charles Ho Kuang"), true);
    });
  })
})



describe('Conditionals', function(){
  describe("#shouldTakeUmbrella(chanceOfRain)", function() {
    it('should return false when the chanceOfRain is less than 0.5', function() {
      assert.equal(shouldTakeUmbrella(0.4), false);
    });
    it('should return false when the chanceOfRain is equal to 0,5', function() {
      assert.equal(shouldTakeUmbrella(0.5), false);
    });
    it('should return true when chanceOfRain is greater than 0,5', function() {
      assert.equal(shouldTakeUmbrella(0.51), true);
    });
    it('should return an error when chanceOfRain is greater than 1', function() {
      assert.equal(shouldTakeUmbrella(1.5), "ERROR: chanceOfRain must be less than 1");
    });
    it('should return an error when chanceOfRain is less than 0', function() {
      assert.equal(shouldTakeUmbrella(-4), "ERROR: chanceOfRain must be less than 1");
    });
    it('should return an error when chanceOfRain is undefined', function() {
      assert.equal(shouldTakeUmbrella(), "ERROR: chanceOfRain must be less than 1");
    });
  })
})


describe('Conditionals', function(){
  describe("#childrensSubtraction(a,b)", function() {
    it('should return false if a < b', function() {
      assert.equal(childrensSubtraction(1,5), false);
    });
    it('should return an error if b is not defined', function() {
      assert.equal(childrensSubtraction(2), 'ERROR: b is not defined');
    });
    it('should return the difference if a > b', function() {
      assert.equal(shouldTakeUmbrella(5,1), 4);
    });
    it('should return the difference if a = b', function() {
      assert.equal(shouldTakeUmbrella(5,5), 0);
    });
  })
})


describe('Conditionals', function(){
  describe("#fizzbuzz(f)", function() {
    it('should return "fizz" if the number is divisible by 3', function() {
      assert.equal(fizzbuzz(6), 'fizz');
    });
    it('should return "buzz" if the number is divisible by 5', function() {
      assert.equal(fizzbuzz(10), 'buzz');
    });
    it('should return "fizzbuzz" if the number is divisible by 3 and 5', function() {
      assert.equal(fizzbuzz(30), 'fizzbuzz');
    });
    it('should return "Not fizz nor buzz!" if the number is not divisible by 3 or 5', function() {
      assert.equal(fizzbuzz(4), 'Not fizz nor buzz!');
    });
  })
})

describe('Conditionals', function(){
  describe("#isNumber(potentialNum)", function() {
    it('should return true if the input is a number', function() {
      assert.equal(isNumber(6), true);
    });
    it('should return true if the input is a number', function() {
      assert.equal(isNumber('6'), true);
    });
    it('should return false if the input is a string', function() {
      assert.equal(isNumber('lauren'), false);
    });
    it('should return false if the input is a boolean', function() {
      assert.equal(isNumber(true), false);
    });
  })
})


describe('Conditionals', function(){
  describe("#stringEquality(a,b)", function() {
    it('should return true if the strings are equal', function() {
      assert.equal(stringEquality('foo','foo'), true);
    });
    it('should return true if the strings are equal', function() {
      assert.equal(stringEquality('foo','  foo'), true);
    });
    it('should return true if the strings are equal', function() {
      assert.equal(stringEquality('fOo','FOO'), true);
    });
    it('should return false if the strings are unequal', function() {
      assert.equal(stringEquality('foo','bar'), true);
    });
  })
})



describe('Conditionals', function(){
  describe("#describeWeather(isItCloudyOutside,isItHotOutside)", function() {
    it('should return "It is beautiful today" if it is not cloudy but is  hot outside', function() {
      assert.equal(describeWeather(false, true), "It is beautiful today");
    });
    it('should return "It is brisk today" if it is neither cloudy nor hot outside', function() {
      assert.equal(describeWeather(false, false), "It is brisk today");
    });
    it('should return "It is bleak today" if it is cloudy but not hot outside', function() {
      assert.equal(describeWeather(true, false), "It is bleak today");
    });
  })
})
