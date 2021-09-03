import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";
import { RouteList } from "../Routes";

const Footer = () => {
  return (
    <>
      <footer>
        <div class="footer-inner wrapper">
          <div class="header-logo">
            <Link to={RouteList.home}>Fete</Link>
          </div>

          <div class="footer-menus">
            <div class="about">
              <h3>
                <span>about us</span>
              </h3>
              <ul>
                <li>
                  <Link>who are we</Link>
                </li>
                <li>
                  <Link>help center</Link>
                </li>

                <li>
                  <Link>careers</Link>
                </li>
              </ul>
            </div>
            <div class="policy">
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
        <div class="copyright">
          &copy;<span>Fete</span>
        </div>
      </footer>
    </>
  );
};

export default Footer;
