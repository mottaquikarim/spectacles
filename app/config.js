// npm level imports
const path = require('path');

const config = {};

// retrieve app root
config.PATH = path.resolve(__dirname + "/..");

// set the content root
config.CONTENT = `${config.PATH}/content`;

// set files to create under each problem
config.TEMPLATES = {
    "prompt.js": "/* prompt.js */",
    "tests.js": "/* tests.js */",
    "background.md": "# Problem ",
};

module.exports = config;
