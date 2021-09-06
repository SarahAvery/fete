import React, { useState, Fragment, useEffect } from "react";
// import PropTypes from "prop-types";
import Modal from "../Modal";
import ModifyEventForm from "../Dashboard/ModifyEventForm";
import { useProfile, withProfile } from "../../contexts/ProfileContext";



import Pie from "../Dashboard/Circle";
import "../Dashboard/Dashboard.scss";
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

const Profile = () => {
  const params = new URLSearchParams(document.location.search.substring(1));
  const eventId = params.get("eventId");

  const { event } = useProfile();

  const [completionPercent, setCompletionPercent] = useState();
  const [budgetPercent, setBudgetPercent] = useState();
  const [isOpen, setIsOpen] = useState({ visible: false });

  useEffect(() => {
    if (event) {
      setCompletionPercent(Math.round((parseInt(event.completed_tasks) / parseInt(event.total_tasks)) * 100))
      setBudgetPercent(Math.round((parseInt(event.expense_actual) / parseInt(event.expense_budget)) * 100))
    }
  }, [event])

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

  const formatMoneyOutput = (money) => {
    return `$${money.toLocaleString("en-US")}`
  }

  return (
    <Fragment>
      <li className="DashbordItem">
        <div className="DashboardItem__content">
          <div className="DashboardItem__titleBox">
            { event && <h3>{event.title}</h3> }
            <i className="fas fa-ellipsis-h" onClick={() => openForm()}></i>
            <ModifyModal isOpen={isOpen.visible} onClose={() => setIsOpen({ ...isOpen, visible: false })}>
              { event && <ModifyEventForm
                event={event}
                closeForm={closeForm}
                openForm={openForm}
                dateFormat={formatDateOutput}
                phoneFormat={formatPhoneState}
              /> }
            </ModifyModal>
          </div>
          <div className="DashboardItems__container">
            <div className="DashboardItems__info">
              <h3>Contact Info</h3>
              <div className="info-section">
                <p className="subtitle">Names:</p>
                { event && <p>
                   {event.first_name} & {event.second_name}
                </p> }
              </div>
              <div className="info-section">
                <p className="subtitle">Date:</p>
                { event && <p>{formatDateOutput(event.event_date)}</p> }
              </div>
              <div className="info-section">
                <p className="subtitle">Email:</p>
                { event && <p>{event.email}</p> }
              </div>
              <div className="info-section">
                <p className="subtitle">Phone:</p>
                { event && <p>{formatPhoneState(event.phone)}</p> }
              </div>
              <div className="info-section">
                <p className="subtitle">Address:</p>
                { event && <p>
                  {event.unit} {event.street_number}, {event.street_name} {event.street_type}, {event.postal_code},{" "}
                  {event.city}
                </p> }
              </div>
            </div>
            <h3>Progress: </h3>
            <div className="DashboardItems__progress">
              <Pie className="pie" percentage={completionPercent} colour="rgb(130, 156, 167)" />
            </div>
            <h3>Budget: </h3>
            <div className="DashboardItems__progress">
              { event && <p>Event Budget: {formatMoneyOutput(event.expense_budget)}</p> }
              { event && <p>Item Expense Total: {formatMoneyOutput(event.expense_actual)}</p> }
              { event && <Pie className="pie" percentage={budgetPercent} colour="rgb(130, 156, 167)" /> }
            </div>
          </div>
          <div className="btn-container-parent">
          <div className="btn-container">
            <Link className="button" to={`/board?eventId=${eventId}`}>
              View Board
            </Link>
          </div>
          </div>
        </div>
      </li>
    </Fragment>
  );
}

// Profile.propTypes = {

// };

export default withProfile(Profile);
