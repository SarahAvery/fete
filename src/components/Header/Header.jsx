import React from "react";
import { Link } from "react-router-dom";
import { authManager, isLoggedIn } from "../../utils/authUtils";
import "./Header.scss";
import { RouteList } from "../Routes";

const Header = () => {
  const isAuthed = isLoggedIn();

  return (
    <>
      <header>
        <div className="header wrapper">
          <div className="header-logo">
            <Link to={RouteList.home}>Fete</Link>
          </div>
          <div className="nav">
            <nav>
              <ul>
                <li>
                  {!isAuthed && <Link to={RouteList.login}>Login</Link>}{" "}
                  {isAuthed && <Link to={RouteList.dashboard}>Dashboard</Link>}
                </li>

                <li>
                  {!isAuthed && <Link to={RouteList.signup}>Signup</Link>}
                  {isAuthed && <Link onClick={() => authManager.logout()}>Logout</Link>}
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
