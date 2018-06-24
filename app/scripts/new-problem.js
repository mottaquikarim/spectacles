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
} = require('./utils');

/*
 *  @function newProblem
 */
const newProblem = () => {
    const problemDirName = `${CONTENT}/${uuid4()}`;

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

    const updateContentRc = createTemplateFiles
        .then(_ => fsWriteIfExists(`${CONTENT}/${CONTENTRCNAME}`, CONTENTRC))
        .then(_ => fsRead(`${CONTENT}/${CONTENTRCNAME}`, "utf8"))
        .then(content => {
            const jsonContent = JSON.parse(content);
            const {length, tagsDict} = jsonContent;
            jsonContent.length = length+1;

            return fsWrite(`${CONTENT}/${CONTENTRCNAME}`, JSON.stringify(jsonContent));
        });

    return updateContentRc;
};

newProblem();
