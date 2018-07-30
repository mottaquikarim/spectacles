/* 
 * FILENAME:    tests.js
 * DESC:        write any tests that much be asserted for this problem to
 *              be considered successfully completed
 * TEST RUNNER: mocha/chai.js
 */

function generate1000TestCases(fn) {
    let variable = 0;
    let array = [];
    while (variable < 1000) {
        array.push(fn());
        variable ++;
    }
}

function checkDifferent(arr) {
    let idx = 1
    while (idx < arr.length()) {
        if (arr[0] === arr[idx])
    }
}