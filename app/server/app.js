// npm level imports
const express = require('express');

// module level exports
const {
    CONTENT,
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

/*
 *  @function readContent 
 *  @desc read content from uuid 
 */
const readContent = uuidDirName => Promise.all(
    Object.keys(TEMPLATES).map(name => fsRead(`${uuidDirName}/${name}`, 'utf8')));

/*
 *  @function hydrateResp 
 *  @desc build object with content from problem 
 */
const hydrateResp = content => Object.keys(TEMPLATES).reduce((obj, name, i) => {
        obj[name] = content[i];
        return obj;
    }, {});

/*
 *  @function runApp 
 *  @desc bootstrap server 
 */
const runApp = () => new Promise((resolve) => {
    const app = express();

    app.use(express.static('public'));

    app.get('/content/:uuid', (req, res) => {
        const problemDirName = `${CONTENT}/${req.params.uuid}`;
        fsStat(problemDirName)
            .then(_ => readContent(problemDirName))
            .then(content => res.json(hydrateResp(content)))
            .catch(err => res.status(400).json({"err": err}));
    });

    app.listen(3000, () => {
        console.log('Listening on port 3000!');
        resolve();
    });
});

module.exports = {
    runApp,
};
