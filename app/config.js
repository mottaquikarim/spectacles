// npm level imports
const path = require('path');

const config = {};

// retrieve app root
config.PATH = path.resolve(__dirname + "/..");

// set the content root
config.CONTENT = `${config.PATH}/content`;

// set files to create under each problem
config.TEMPLATES = {
    "prompt.js": `
/* 
 * FILENAME:    prompt.js
 * DESC:        write any starter code required here 
 */
    `,
    "tests.js": `
/* 
 * FILENAME:    tests.js
 * DESC:        write any tests that much be asserted for this problem to
 *              be considered successfully completed
 * TEST RUNNER: mocha/chai.js
 */
    `,
    "background.md": `
# Problem Synopsis

Add any and all background / context / requirements needed to solve this poblem here.
    `,
    "meta.json": `{},`
};

config.CONTENTRCNAME = '.contentrc';
config.CONTENTRC = `{
    "length": 0,
    "tagsDict": {}
}`;

module.exports = config;
