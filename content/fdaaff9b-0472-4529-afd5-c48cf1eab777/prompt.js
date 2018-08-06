
/* 
 * FILENAME:    prompt.js
 * DESC:        write any starter code required here 
 */
    
    
//it's missing the first 2 questions: isUndefined(a) and isNameTooLong(name)

/*
    @func shouldTakeUmbrella
    @param {number} chanceOfRain
    @returns {boolean}
    @desc - if `chanceOfRain` > 0.5, return true
            if `chanceOfRain`  > 1, return
                "ERROR: chanceOfRain must be less than 1"

    @example shouldTakeUmbrella(0.4); // false
    @example shouldTakeUmbrella(0.8); // true
    @example shouldTakeUmbrella( 9 ); // "ERROR: chanceOfRain must be less than 1"
    @example shouldTakeUmbrella(); // "ERROR: chanceOfRain must be less than 1"
    @example shouldTakeUmbrella( -8 ); // "ERROR: chanceOfRain must be greater than 0"
    @example shouldTakeUmbrella( -0.3 ); // "ERROR: chanceOfRain must be greater than 0"
*/


/*
    @func childrensSubtraction
    @param {number} a
    @param {number} b
    returns {number || boolean}
    @desc - write a function that helps a 3rd grader do his math hw
            they haven't learned about integers yet,

            so subtracting a - b when a < b is impossible in their world

            IF a < b, return false
            otherwise, compute the difference and return that instead

    @example childrensSubtraction( 1, 2 ); // false
    @example childrensSubtraction( 2, 1 ); // 1
    @example childrensSubtraction( 2 ); // "ERROR: b is not defined"
*/

/*
    @func fizzbuzz
    @param {number} f
    @returns {string}
    @desc -
        Write a function that takes an integer as an argument and
        determines whether it is a multiple of 3, 5 or both.

        If the number is divisible by 3,
            return the string 'fizz';
        If the number is divisible by 5,
            return the string 'buzz';
        If the number is divisible by 3 and 5,
            return the string 'fizzbuzz';
        If the number is not divisible by 3 nor 5,
            return the string 'Not fizz nor buzz!'

    @example fizzbuzz( 1 ); // 'Not fizz nor buzz!'
    @example fizzbuzz( 15 ); // 'fizzbuzz'
*/



/*
    @func isNumber
    @param potentialNum
    @returns {boolean}
    @desc - using the google, determine how you could determine if a
            value is a __valid__ number

            if it IS a number, return true

    @example isNumber( 1 ); // true
    @example isNumber( 'taq' ) // false
    @example isNumber( "3" ) // true
*/

/*
    @func stringEquality
    @param {string} a
    @param {string} b
    @returns {boolean}
    @desc - takes in two strings, determines if they are equal

    @example stringEquality('foo', 'foo') // true
    @example stringEquality('bar', 'foo') // false
    @example stringEquality( 'bar', '   bar' ) // true
    @example stringEquality('bAr', 'BAR') // true
*/


/*
    @func describeWeather
    @param {boolean} isItCloudyOutside
    @param {boolean} isItHotOutside
    @returns {string}
    @desc -
        IF
            isItCloudyOutside is false
        AND
            IsItHotOutside is true
        SHOW:
            It is beautiful today

        IF
            isItCloudyOutside is false
        AND
            IsItHotOutside is false
        SHOW:
            It is brisk today

        IF
            isItCloudyOutside is true
        AND
            IsItHotOutside is false
        SHOW:
            It is bleak today
*/

