import React from "react";
import { Link } from "react-router-dom";
import { isLoggedIn } from "../../utils/authUtils";
import "./Header.scss";

// import PropTypes from "prop-types";

const Header = () => {
  const isAuthed = isLoggedIn();
  console.log("header");

  return (
    <header>
      <div className="header wrapper">
        <div className="header-logo">
          <Link to="/">Fete</Link>
        </div>
        <div className="nav">
          <nav>
            <ul>
              <li>{!isAuthed && <Link to="/signup">Signup</Link>}</li>
              <li>
                {!isAuthed && <Link to="/login">Login</Link>}
                {isAuthed && <Link to="/logout">Logout</Link>}
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
