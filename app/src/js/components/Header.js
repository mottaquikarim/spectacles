import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const mapStateToProps = state => {
  const {selected_branch} = state.genericReducer;

  return {
    selected_branch,
  }
};

const selectedBranch = selected_branch => {
    if (!selected_branch) return null;

    return (<div className="btn-group">
        <div className="btn btn-sm btn-info active"><strong>BRANCH</strong></div>
        <div className="btn btn-sm btn-info">{selected_branch}</div>
    </div>);
}

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
