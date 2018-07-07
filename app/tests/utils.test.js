// test helpers
const {isPromise} = require('./helpers');

// methods to test
const {promisify} = require('../utils');

describe('promisify', () => {
    const fixt = {};
    fixt.cbTest = (cb) => {
        cb(null, 'test!') 
    }
    fixt.cbNonFunctionTest = 4

    promisifyFixt = promisify(fixt, 'cbTest'); 

    it('should return a function', () => {
        expect(typeof promisifyFixt).toBe('function');
    })

    it('should return a promise', () => {
        expect(isPromise(promisifyFixt())).toBe(true);
    })

    it('should reject if method is not function', () => {
        catchFixt = promisify(fixt, 'cbNonFunctionTest')
        catchFixt().catch(e => {
            expect(e).toBe("Not valid function")
        });
    })
})
