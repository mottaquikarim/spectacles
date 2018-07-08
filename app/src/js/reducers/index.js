import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

import {
    ADD_BRANCHES,
    ADD_PERSONAL_ACCESS_TOKEN,
    ADD_SELECTED_BRANCH,
} from "../constants/action-types";

const initialState = {
  personal_access_token: sessionStorage.getItem('personal_access_token'),
  contentrc: null,
  content: null,
  branches: [],
  selected_branch: sessionStorage.getItem('selected_branch'),
};

const genericReducer = (state = initialState, action) => {
  switch (action.type) {

    case ADD_PERSONAL_ACCESS_TOKEN:
      return Object.assign({}, state, {
        personal_access_token: action.payload
      });

    case ADD_BRANCHES:
        return Object.assign({}, state, {
            branches: action.payload,
        });

    case ADD_SELECTED_BRANCH:
        return Object.assign({}, state, {
            selected_branch: action.payload,
        });

    default:
      return state;
  }
};

const rootReducer = combineReducers({
    genericReducer,
    routing,
});

export default rootReducer;
