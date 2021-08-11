import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

// import PropTypes from "prop-types";

const Header = (props) => {
  return (
    <header>
      <div className="header wrapper">
        <div className="header-logo">
          <Link to="/">Weddly</Link>
        </div>
        <div className="nav">
          <nav>
            <ul>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

// Header.propTypes = {};

export default Header;
