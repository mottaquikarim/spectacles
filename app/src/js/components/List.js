import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom'

const mapStateToProps = state => {
  return { articles: state.genericReducer.articles };
};
const ConnectedList = ({ articles }) => (
  <ul className="list-group list-group-flush">
    <li><Link to="/test">Testing!</Link></li>
    {articles.map(el => (
      <li className="list-group-item" key={el.id}>
        {el.title}
      </li>
    ))}
  </ul>
);
const List = connect(mapStateToProps)(ConnectedList);
export default List;
