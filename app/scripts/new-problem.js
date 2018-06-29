// npm level imports
const uuid4 = require('uuid/v4');

// module level exports
const {
    CONTENT,
    CONTENTRC,
    CONTENTRCNAME,
    PATH,
    TEMPLATES,
} = require('../config');

const {
    fsMkdir,
    fsRead,
    fsStat,
    fsWrite,
    fsWriteIfExists,
    mkdirp,
} = require('../utils');

const {updateContentRc} = require('./update-contentrc');

/*
 *  @function newProblem
 */
const newProblem = () => {
    const uuid = uuid4();
    const problemDirName = `${CONTENT}/${uuid}`;

    const createContentDir = mkdirp(CONTENT);

    const createUuidDir = createContentDir
        .then(_ => fsMkdir(problemDirName))
        .catch(e => console.log(e));

    const createTemplateFiles = createUuidDir
        .then(_ => {
            return Promise.all(Object.keys(TEMPLATES)
                .map(name => {
                    const templateName = `${problemDirName}/${name}`;
                    const templateContent = TEMPLATES[name];

                    return fsWrite(templateName, templateContent);
                }));
        });

    return createTemplateFiles
        .then(_ => updateContentRc())
        .then(_ => uuid);
};

module.exports = {
    newProblem,
};
