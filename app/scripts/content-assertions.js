// npm level imports

// module level exports
const {
    CONTENT,
    CONTENTRC,
    CONTENTRCNAME,
    TEMPLATES,
} = require('../config');

const {
    fsRead,
    fsReaddir,
    fsWrite,
    fsWriteIfExists,
} = require('../utils');

/*
 *  @function updateContentRc 
 *  @desc regenerate .contentrc file based
 *        current state of content/ directory
 */
const contentAssertions = () => {
    const contentRc = `${CONTENT}/${CONTENTRCNAME}`;

    // grab all dirs from content folter
    // filter down to ONLY dirs - for now
    // this is a "lazy" approach where we
    // simply eliminate the contentrcname
    // under the assumption that all other
    // content here should be dirs
    const getProblems = fsReaddir(CONTENT)
        .then(dirs => dirs.filter(dir => dir !== CONTENTRCNAME));

    // for each problem, get all files within the dir
    // return as an object with [path]: [filenames]
    const getProblemsContent = getProblems
        .then(dirs => Promise.all(dirs.map(dir => {
            const path = `${CONTENT}/${dir}`;
            return fsReaddir(path).then(files => ({
                [path]: files,
            }));
        })))
    // combine all the returned objects (which are in an array)
    // into a singular object. we expect the paths to be all
    // unique so this is valid
        .then(problems => Object.assign({}, ...problems))

    // assert that for each problem, the files within the dir
    // are in fact consistent with what is defined in config
    return getProblemsContent.then(problems => {
        // this will get us a list of problem names
        const problemsList = Object.keys(problems);
        // this will get us a list of the filenames we
        // want to assert exists within each problem
        const expectedFiles = Object.keys(TEMPLATES);
        const numExpectedFiles = expectedFiles.length;

        // we will use the Set() object to assert uniqueness
        // begin by creating a set of the expected files
        const expectedFilesSet = new Set(expectedFiles);

        // for loop make sense here for the ability to
        // break out of the loop as soon as a validation
        // error surfaces
        for (let key of problemsList) {
            const filesInProblem = problems[key]
            const UUID = key.split('/').pop()

            // if we have fewer files in the problem
            // than expectedFiles from config, there is 
            // a validation error - reject.
            if (filesInProblem.length < numExpectedFiles) {
                return Promise.reject(`
ERROR: 
    Expected to find ${numExpectedFiles} files in problem ${UUID}.
    Instead found ${filesInProblem.length} files.
    Filenames: ${filesInProblem.join(', ')} 
    Expected filenames: ${expectedFiles.join(', ')}
                `);
            }

            for (let file of filesInProblem) {
                // if NOT already in set, we have validation error
                if (!expectedFilesSet.has(file)) {
                    return Promise.reject(`
ERROR: 
    Unexpected file, ${file} found in problem ${UUID}.
    This is not valid according to spec.
    Expected filenames: ${expectedFiles.join(', ')}
                    `);
                }
            }
            console.log(`SUCCESSFULL VALIDATED: problem ${UUID}`)
        } // outer for loop
        
        return Promise.resolve();
    });
}

module.exports = {
    contentAssertions,
};
