import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import Modal from "../Modal";
import ModifyEventForm from "../Dashboard/ModifyEventForm";

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

const ModifyModal = ({ isOpen, onClose, children }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {children}
    </Modal>
  );
};

export default function DashboardItem(props) {
  const percent = Math.round((parseInt(props.completed_tasks) / parseInt(props.total_tasks)) * 100);

  const [isOpen, setIsOpen] = useState({ visible: false });

  const openForm = () => {
    setIsOpen({ visible: true });
  };

  const closeForm = () => {
    setIsOpen({ visible: false });
  };

  const formatDateOutput = (timestamptz) => {
    // console.log('date (timestamptz): ', timestamptz) // => 2016-06-23T02:10:25.000Z
    return new Date(timestamptz).toDateString();
  };

  const formatPhoneState = (phone) => {
    return phone.includes("-") ? phone : `${phone.slice(0, 3)}-${phone.slice(3, 6)}-${phone.slice(6, 10)}`;
  };

  return (
    <Fragment>
      <li className="DashbordItem">
        <div className="DashboardItem__content">
          <div className="DashboardItem__titleBox">
            <h3>{props.title}</h3>
            <i className="fas fa-ellipsis-h" onClick={() => openForm()}></i>
            <ModifyModal isOpen={isOpen.visible} onClose={() => setIsOpen({ ...isOpen, visible: false })}>
              <ModifyEventForm
                event={props}
                closeForm={closeForm}
                openForm={openForm}
                dateFormat={formatDateOutput}
                phoneFormat={formatPhoneState}
              />
            </ModifyModal>
          </div>
          <div className="DashboardItems__container">
            <div className="DashboardItems__info">
              <div className="info-section">
                <p className="subtitle">Names:</p>
                <p>
                  {props.first_name} & {props.second_name}
                </p>
              </div>
              <div className="info-section">
                <p className="subtitle">Date:</p>
                <p>{formatDateOutput(props.event_date)}</p>
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
                  {props.unit} {props.street_number}, {props.street_name} {props.street_type}, {props.postal_code},{" "}
                  {props.city}
                </p>
              </div>
            </div>
            <div className="DashboardItems__progress">
              <Pie className="pie" percentage={percent} colour="rgb(130, 156, 167)" />
            </div>
          </div>
          <div className="btn-container">
            <Link className="button" to={`/board?eventId=${props.event_id}`}>
              View Board
            </Link>
          </div>
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
  event_date: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
  unit: PropTypes.string,
  street_number: PropTypes.string,
  street_name: PropTypes.string,
  street_type: PropTypes.string,
  postal_code: PropTypes.string,
  city: PropTypes.string,
  percent: PropTypes.number,
};
