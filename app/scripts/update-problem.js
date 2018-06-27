// module level exports
const opn = require('opn');
const {runApp} = require('../server/app');

const {
  CONTENT
} = require('../config');

const {
  fsStat
} = require('../utils');

/*
 *  @function updateProblem
 */
const updateProblem = (argv) => {
  
  const uuid = argv._[1];
  const problemDirName = `${CONTENT}/${uuid}`;

  // UUID Error Checks
  if (!uuid) { console.log("Error: Please select a UUID."); return; } 
  fsStat(problemDirName)
    .then(runApp())
    .then(_ => {
        console.log(`Launching: http://localhost:3000/?uuid=${uuid}`);
        opn(`http://localhost:3000/?uuid=${uuid}`);
    })
    .catch(err => { 
        console.log(`Error: ${problemDirName} doesn't exist. Please make sure you pulled from repo.`); 
        return; 
    });

};

module.exports = {updateProblem};