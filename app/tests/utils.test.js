// test helpers
const {isPromise} = require('./helpers');

// methods to test
const {promisify} = require('../utils');

describe('promisify', () => {
    const fixt = {};
    fixt.cbTest = (cb) => {
        cb(null, 'test!') 
    }
    const promisifyFixt = promisify(fixt, 'cbTest'); 

    it('should return a function', () => {
        expect(typeof promisifyFixt).toBe('function');
    })

    it('should return a promise', () => {
        expect(isPromise(promisifyFixt())).toBe(true);
    })
})
