// module level exports
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
  if (!uuid) { 
    return Promise.reject("Error: Please select a UUID."); 
  } 

  return fsStat(problemDirName)
    .then(() => {
      return uuid;
    })
    .catch(err => { 
        console.log(`Error: ${problemDirName} doesn't exist. Please make sure you pulled from repo.`); 
        return; 
    });

};

module.exports = {updateProblem};