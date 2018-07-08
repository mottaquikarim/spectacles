const axios = require('axios');

const GITHUB_API = "https://api.github.com";
const OWNER = "mottaquikarim";
const REPO = "spectacles";

/*
 *  Given an API "prefix" (ie: repo, user, etc)
 *  and "path" (ie: git/commit/:path, etc)
 *  plug in owner and repo config values
 */
const getPath = (prefix, path, owner=OWNER, repo=REPO) => `/${prefix}/${owner}/${repo}/${path}`;

/*
 *  Generic method for making API calls to Github
 */
const request = (
    path, 
    method,
    params = {},
    headers = {},
    data = {},
    base = GITHUB_API,
    access_token = sessionStorage.getItem('personal_access_token')
) => axios({
    url: path,
    baseURL: base,
    method,
    params: Object.assign({}, params, {
        access_token,
    }),
    headers,
    data,
});

/*
 *  Get contents of path, given UUID
 */
const getContent = (uuid, localData, selected_branch) => request(
    getPath('repos', 'contents/content/' + uuid), 
    "GET",
    {ref: selected_branch},
).then(({data}) => Promise.all(data.map(item => {
    const {path} = item;
    const hash = {};
    hash.name = path.split('/').pop();
    hash.type = hash.name.split('.').pop();
    return request(
        getPath("repos", "contents/" + path),
        "GET",
        {ref: selected_branch},
    ).then(({data}) => {
        const {content} = data;
        const localItem = localData.filter(
            item => item.name === data.name
        );

        if (localItem.length) {
            hash.content = localItem[0].content;
        }
        else {
            hash.content = atob(content);
        }

        hash.sha = data.sha;
        return hash;
   });
}))).then(all => {
    localStorage.setItem(uuid, JSON.stringify(all));
    return all;
});

/*
 *  Build a new commit and send to branch
 */
const save = (uuid, localData, selected_branch, msg) => {
    const commitSha = request(getPath("repos", "git/" + selected_branch), "GET")
        .then(({data}) => data.object.sha)

    const shaBaseTree = commitSha.then(sha => request(getPath("repos", "git/commits/" + sha), "GET"))
        .then(({data}) => data.sha);

    const shaNewTree = shaBaseTree.then(sha => request(
        getPath("repos", "git/trees"),
        "POST",
        {},
        {},
        {
            base_tree: sha,
            tree: localData.map(each =>({
                mode: '100644',
                type: 'blob',
                path: 'content/' + uuid + "/" + each.name,
                content: each.content,
            })),
        }
    )).then(({data}) => data.sha);

    const shaNewCommit = Promise.all([commitSha, shaNewTree])
        .then(([commitSha, shaNewTree]) => {
            return request(
                getPath("repos", "git/commits"),
                "POST",
                {},
                {},
                {
                    parents: [commitSha],
                    tree: shaNewTree,
                    message: msg,
                }
            );
        })
        .then(({data}) => data.sha);
    
    const finalStep = shaNewCommit.then(sha => request(
        getPath("repos", "git/" + selected_branch),
        "POST",
        {},
        {},
        {sha,}
    )).then(({data}) => console.log(data));

    return finalStep;
}

export {
    getPath,
    request,
    save,
    getContent,
}

