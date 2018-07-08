import {
    ADD_BRANCHES,
    ADD_PERSONAL_ACCESS_TOKEN,
    ADD_SELECTED_BRANCH,
} from "../constants/action-types";

export const addAccessToken = token => ({
    type: ADD_PERSONAL_ACCESS_TOKEN,
    payload: token
});

export const addBranches = data => ({
    type: ADD_BRANCHES,
    payload: data,
});

export const addSelectedBranch = branch => ({
    type: ADD_SELECTED_BRANCH,
    payload: branch,
});
