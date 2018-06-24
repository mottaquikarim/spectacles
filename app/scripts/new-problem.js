// npm level imports
const fs = require('fs');
const uuid4 = require('uuid/v4');

// module level exports
const {
    CONTENT,
    PATH,
    TEMPLATES,
} = require('../config');
const {promisify} = require('./utils');

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
 *  @function newProblem
 */
const newProblem = () => {
    const problemDirName = `${CONTENT}/${uuid4()}`;

    const createContentDir = mkdirp(CONTENT);

    const createUuidDir = createContentDir
        .then(_ => fsMkdir(problemDirName))
        .catch(e => console.log(e));

    const createTemplateFiles = createUuidDir.then(_ => {
        return Promise.all(Object.keys(TEMPLATES)
            .map(name => {
                const templateName = `${problemDirName}/${name}`;
                const templateContent = TEMPLATES[name];

                return fsWrite(templateName, templateContent);
            }));
    });

    return createTemplateFiles;
};

newProblem();
