// npm level imports
const express = require('express');
const bodyParser = require('body-parser');

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
 *  @function statProblem 
 *  @desc check if problem exists, otherwise throw error 
 */
const statProblem = uuid => {
    const problemDirName = `${CONTENT}/${uuid}`;
    return fsStat(problemDirName)
        .then(_ => readContent(problemDirName));
};

/*
 *  @function runApp 
 *  @desc bootstrap server 
 */
const runApp = () => new Promise((resolve) => {
    const app = express();

    app.use(express.static('public'));
    app.use(bodyParser.json());

    app.get('/content/:uuid', (req, res) => statProblem(req.params.uuid)
        .then(content => res.json(hydrateResp(content)))
        .catch(err => res.status(400).json({"err": err})));

    app.post('/content/:uuid', (req, res) => {
        statProblem(req.params.uuid)
            .then(content => hydrateResp(content))
            .then(hydratedContent => {
                const reqBody = Object.keys(req.body).reduce((hash, key) => {
                    if (hash[key]) {
                        hash[key] = req.body[key];
                    }
                    return hash;
                }, hydratedContent);

                return Promise.all(Object.keys(reqBody).map(key => {
                    return fsWrite(`${CONTENT}/${req.params.uuid}/${key}`, reqBody[key]); 
                }));
            })
            .then(_ => res.json({"success": true}))
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
