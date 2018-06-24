// npm level imports
const fs = require('fs');

/*
 *  @function promisify 
 *  @desc takes standard nodejs asynch method
 *        and converts to promise
 */
function promisify(namespace, method) {
    const func = namespace[method];
    return (...args) => new Promise((resolve, reject) => {
        if (typeof func !== "function") {
            reject("Not valid function");
            return;
        }

        func(...args, (err, ...rest) => {
            if (err) reject(err);
            else resolve(...rest);
        });
    });
}

/*
 *  @function fsStat
 *  @desc creates a promisified version of fs.stat
 */
const fsStat = promisify(fs, 'stat');
/*
 *  @function fsMkdir
 *  @desc creates a promisified version of fs.mkdir
 */
const fsMkdir = promisify(fs, 'mkdir');

/*
 *  @function mkdirp 
 *  @desc assert that dir exists, if not, create 
 */
const mkdirp = dir => fsStat(dir).catch(err => fsMkdir(dir));

/*
 *  @function fsWrite
 *  @desc return promise for writing file 
 */
const fsWrite = promisify(fs, 'writeFile');

/*
 *  @function fsRead
 *  @desc return promise for read file 
 */
const fsRead = promisify(fs, 'readFile');

/*
 *  @function fsWriteIfExists
 *  @desc return promise for writing file if exists
 */
const fsWriteIfExists = (fileName, content="") => fsRead(fileName)
    .catch(err => fsWrite(fileName, content));

module.exports = {
    promisify,
    fsMkdir,
    fsRead,
    fsStat,
    fsWrite,
    fsWriteIfExists,
    mkdirp,
};
