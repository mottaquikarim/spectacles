import React from "react";
import { connect } from "react-redux";
const mapStateToProps = state => {
  return { articles: state.genericReducer.articles };
};
const ConnectedList = ({ articles }) => (
  <ul className="list-group list-group-flush">
    <li>Testing 2!</li>
  </ul>
);
const Test = connect(mapStateToProps)(ConnectedList);
export default Test;
