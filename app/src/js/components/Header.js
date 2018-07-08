import React from "react";
import { Link } from "react-router-dom";

const Header = () => (<nav className="navbar navbar-expand-lg navbar-dark">
    <Link className="navbar-brand" to="/">SPECTACLES</Link>
    <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
                <a className="nav-link" href="#"></a>
            </li>
        </ul>
    </div>
</nav>);

export default Header;
