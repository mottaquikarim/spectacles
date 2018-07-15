#!/usr/bin/env node

// npm level imports
const minimist = require('minimist');
const opn = require('opn');

// module level exports
const {newProblem} = require('./scripts/new-problem');
const {updateProblem} = require('./scripts/update-problem');
const {updateContentRc} = require('./scripts/update-contentrc');
const {contentAssertions} = require('./scripts/content-assertions');
const {runApp} = require('./server/app');

/*
 *  @function openInBrowser
 *  @desc open URL in browser after app boostraps
 */
const openInBrowser = (uuid) => {
    return runApp()
        .then(_ => {
            console.log(uuid)
            if (!uuid) {
                console.log(`Launching: http://localhost:3000/`);
                opn(`http://localhost:3000/`);

                return;
            }
            
            console.log(`Launching: http://localhost:3000/?uuid=${uuid}`);
            opn(`http://localhost:3000/?uuid=${uuid}`);
        })
        .catch(e => {
            console.log('error opening!', e);
            // exit with error
            process.exit(1);
        })
};

/*
 *  @function runSwitchLogic
 *  @desc select the proper script to run based on input
 */
const runSwitchLogic = (scriptName, argv) => {
    switch (scriptName) {
        case "newProblem":
           return newProblem();
        case "updateProblem":
            return updateProblem(argv);
        case "updateContentrc":
            return updateContentRc();
        case "contentAssertions":
            return contentAssertions();
        case "runApp":
            return Promise.resolve();
        default:
            return Promise.reject();
    }
}

const run = () => {
    const argv = minimist(process.argv.slice(2));
    
    const scriptName = argv._[0].split('-').map((curr, i) => {
        if (i === 0) return curr;
        return curr[0].toUpperCase() + curr.slice(1);
    }).join("");

    runSwitchLogic(scriptName, argv)
        .then(uuid => {
            if (uuid) {
                return openInBrowser(uuid);
            }
            else {
                console.log('Successfully ran: ' + scriptName);
            }
        })
        .catch(e => {
            console.log(e)
            // exit with error
            process.exit(1);
        })
};

run();
