const axios = require('axios');

const GITHUB_API = "https://api.github.com";
const OWNER = "mottaquikarim";
const REPO = "spectacles";

const getPath = (prefix, path, owner=OWNER, repo=REPO) => `/${prefix}/${owner}/${repo}/${path}`;

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

export {
    getPath,
    request,
}

