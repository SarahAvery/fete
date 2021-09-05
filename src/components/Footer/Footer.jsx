import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";
import { RouteList } from "../Routes";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="footer-inner wrapper">
          <div className="header-logo">
            <Link to={RouteList.home}>Fete</Link>
          </div>

          <div className="footer-menus">
            <div className="about">
              <h3>
                <span>about us</span>
              </h3>
              <ul>
                <li>
                  <Link>who are we</Link>
                </li>
                <li>
                  <Link>memberships</Link>
                </li>
                <li>
                  <Link>help center</Link>
                </li>

                <li>
                  <Link>careers</Link>
                </li>
              </ul>
            </div>
            <div className="policy">
              <h3>
                <span>our policies</span>
              </h3>
              <ul>
                <li>
                  <Link> copyright & trademark </Link>
                </li>
                <li>
                  <Link> terms of service </Link>
                </li>
                <li>
                  <Link> privacy & cookies </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="copyright">
          &copy;<span>Fete</span>
        </div>
        <div className="rainbow"></div>
      </footer>
    </>
  );
};

export default Footer;
