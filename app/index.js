#!/usr/bin/env node

// npm level imports
const minimist = require('minimist');
const {newProblem} = require('./scripts/new-problem');
const run = () => {
    const argv = minimist(process.argv.slice(2));

    const scriptName = argv._[0].split('-').map((curr, i) => {
        if (i === 0) return curr;
        return curr[0].toUpperCase() + curr.slice(1);
    }).join("");

    switch (scriptName) {
        case "newProblem":
            newProblem();
            break;
        default:
            console.log('not found');
    }
};

run();
