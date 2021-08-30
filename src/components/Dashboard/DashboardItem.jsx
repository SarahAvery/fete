import React, { Fragment } from "react";
import PropTypes from "prop-types";

import Pie from "./Circle";
import "./Dashboard.scss";
import { Link } from "react-router-dom";
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
  integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ=="
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
/>;

export default function DashboardItem(props) {
  return (
    <Fragment>
      <li className="DashbordItem">
        <div className="DashboardItem__content">
          <div className="DashboardItem__titleBox">
            <h3>{props.title}</h3>
            <i className="fas fa-ellipsis-h"></i>
            {/* i will need to be an onclick to open 'edit' and 'delete' */}
          </div>
          <div className="DashboardItems__info">
            <div className="info-section">
              <p className="subtitle">Names:</p>
              <p>
                {props.first_name} & {props.second_name}
              </p>
            </div>
            <div className="info-section">
              <p className="subtitle">Date:</p>
              <p>
                {props.weekday}, {props.month} {props.day}, {props.year}
              </p>
            </div>
            <div className="info-section">
              <p className="subtitle">Email:</p>
              <p>{props.email}</p>
            </div>
            <div className="info-section">
              <p className="subtitle">Phone:</p>
              <p>{props.phone}</p>
            </div>
            <div className="info-section">
              <p className="subtitle">Address:</p>
              <p>
                {props.unit} {props.street_number}, {props.street_name} {props.type}, {props.postal}, {props.city}
              </p>
            </div>
          </div>
          <div className="DashboardItems__progress">
            <Pie className="pie" percentage={props.percent} colour="rgb(121, 133, 95)" />
          </div>
          <Link to={`/board?eventId=${props.id}`}>View Board</Link>
        </div>
      </li>
    </Fragment>
  );
}

DashboardItem.propTypes = {
  events: PropTypes.array,
  id: PropTypes.number,
  title: PropTypes.string,
  first_name: PropTypes.string,
  second_name: PropTypes.string,
  weekday: PropTypes.string,
  month: PropTypes.string,
  day: PropTypes.number,
  year: PropTypes.number,
  email: PropTypes.string,
  phone: PropTypes.number,
  unit: PropTypes.number,
  street_number: PropTypes.number,
  street_name: PropTypes.string,
  type: PropTypes.string,
  postal: PropTypes.string,
  city: PropTypes.string,
  percent: PropTypes.number,
};
