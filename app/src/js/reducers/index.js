import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

import { ADD_ARTICLE } from "../constants/action-types";
const initialState = {
  articles: []
};
const genericReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ARTICLE:
      return Object.assign({}, state, {articles: [...state.articles, action.payload]});
    default:
      return state;
  }
};

const rootReducer = combineReducers({
    genericReducer,
    routing
});

export default rootReducer;
