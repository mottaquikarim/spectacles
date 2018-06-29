// npm level imports

// module level exports
const {
    CONTENT,
    CONTENTRCNAME,
} = require('../config');

const {
    fsRead,
    fsWrite,
    fsReaddir,
} = require('../utils');


/*
 *  @function updateContentRc 
 *  @desc regenerate .contentrc file based
 *        current state of content/ directory
 *        in particular, compute the length of subdirs
 *        and *also* walk through meta.json file looking
 *        tags to populate
 *  @TODO hook into travis after_success callback:
 *         https://gist.github.com/willprice/e07efd73fb7f13f917ea
 */
const updateContentRc = () => {
    const contentRc = `${CONTENT}/${CONTENTRCNAME}`;

    // grab all dirs from content folter
    // filter down to ONLY dirs - for now
    // this is a "lazy" approach where we
    // simply eliminate the contentrcname
    // under the assumption that all other
    // content here should be dirs
    const getProblems = fsReaddir(CONTENT)
        .then(dirs => dirs.filter(dir => dir !== CONTENTRCNAME));
    
    // read the content in contentrc
    const readContentRc = fsRead(contentRc, 'utf8')
        .then(content => JSON.parse(content));

    // walk through EACH directory in content/
    // which represents a "problem" and
    // try to read a "meta.json" file per problem
    // if exists, return an object that looks like:
    // {UUID: contentsOfMetaJSON} else:
    // {UUID: null}
    const attemptReadMeta = getProblems
        .then(dirs => dirs.map(dir => {
            const dirPath = `${CONTENT}/${dir}`;
            return fsRead(`${dirPath}/meta.json`, 'utf8')
                .then(data => ({
                    [dir]: JSON.parse(data), 
                }))
                .catch(e => ({
                    [dir]: null, 
                }));
        }));

    // take the returned list of {UUID: contents}
    // then, merge the list into ONE dict
    // then, filter out all the nulls
    // then, invert the dict so that unique tags
    // are the keys and the UUIDs are in lists
    // per tag
    const mergeFilteredMeta = attemptReadMeta
        // promise returns an ARRAY of promises,
        // ensure they are ALL resolved first
        .then(all => Promise.all(all))
        // we get back an array of objects,
        // like so: [{ UUID1: content}, {UUID2: content}]
        // merge into ONE object, like so:
        // {UUID1: metaContentJson, UUID2: metaContentJson}
        .then(meta => Object.assign({}, ...meta))
        // filter out all UUID keys that point to null
        // returning an object with ONLY UUID keys that have content
        .then(merged => Object.keys(merged).reduce((filteredMerge, key) => {
            if (merged[key]) {
                filteredMerge[key] = merged[key]
            }
            return filteredMerge;
        }, {}))
        // invert this UUID keys object - 
        // extract tags as keys and push UUIDs to those keys
        .then(uuidsObj => Object.keys(uuidsObj).reduce((invertedObj, uuid) => {
            const meta = uuidsObj[uuid];
            if (!meta.tags) return invertedObj;

            meta.tags.forEach(tag => {
                if (!invertedObj[tag]) {
                    invertedObj[tag] = [];
                }

                invertedObj[tag].push(uuid)
            });

            return invertedObj;
        }, {}))
        .catch(e => console.log(e))

    // finally, given the length of problems
    // the this "tagsDict", update .contentrc
    return Promise.all([getProblems, readContentRc, mergeFilteredMeta])
        .then(([problems, content, mergeFilteredMeta]) => {
            content.length = problems.length;
            content.tagsDict = mergeFilteredMeta;
            return fsWrite(contentRc, JSON.stringify(content))
        });
};

module.exports = {
    updateContentRc,
};
