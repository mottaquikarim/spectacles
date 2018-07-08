import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const mapStateToProps = state => {
  const {selected_branch} = state.genericReducer;

  return {
    selected_branch,
  }
};

const selectedBranch = selected_branch => (<div>
    {selected_branch ? (<div><strong>CURRENT BRANCH: </strong>{selected_branch}</div>) : null}
</div>)

const ConnectedHeader = ({selected_branch}) => (<nav className="navbar navbar-expand-lg navbar-dark">
    <Link className="navbar-brand" to="/">SPECTACLES</Link>
    <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
                <a className="nav-link" href="#"></a>
            </li>
        </ul>
        <div className="form-inline my-2 my-lg-0">
            {selectedBranch(selected_branch)}
        </div>
    </div>
</nav>);

const Header = connect(mapStateToProps)(ConnectedHeader);
export default Header;
