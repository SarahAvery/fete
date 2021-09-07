import React, { useState, Fragment, useEffect } from "react";
import Modal from "../Modal";
import ModifyEventForm from "../Dashboard/ModifyEventForm";

import Pie from "../Dashboard/Circle";

import "./Profile.scss";
import { Link } from "react-router-dom";
import { useDashboard, withDashboard } from "../../contexts/DashboardContext";

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

  const { event } = useDashboard();

  const [completionPercent, setCompletionPercent] = useState();
  const [budgetPercent, setBudgetPercent] = useState();
  const [isOpen, setIsOpen] = useState({ visible: false });

  useEffect(() => {
    if (event) {
      setCompletionPercent(Math.round((parseInt(event.completed_tasks) / parseInt(event.total_tasks)) * 100));
      setBudgetPercent(Math.round((parseInt(event.expense_actual) / parseInt(event.expense_budget)) * 100));
    }
  }, [event]);

  const openForm = () => {
    setIsOpen({ visible: true });
  };

  const closeForm = () => {
    setIsOpen({ visible: false });
  };

  const formatDateOutput = (timestamptz) => {
    return new Date(timestamptz).toDateString();
  };

  const formatPhoneState = (phone) => {
    return phone.includes("-") ? phone : `${phone.slice(0, 3)}-${phone.slice(3, 6)}-${phone.slice(6, 10)}`;
  };

  const formatMoneyOutput = (money) => {
    return `$${money.toLocaleString("en-US")}`;
  };

  return (
    <Fragment>
      <div className="Profile">
        <div className="wrapper">
          <div className="header-banner">
            {event && <h1>{event.title}</h1>}
            <p>
              <i className="fas fa-pen fa-sm" onClick={() => openForm()}></i>
            </p>
            <ModifyModal isOpen={isOpen.visible} onClose={() => setIsOpen({ ...isOpen, visible: false })}>
              {event && (
                <ModifyEventForm
                  event={event}
                  closeForm={closeForm}
                  openForm={openForm}
                  dateFormat={formatDateOutput}
                  phoneFormat={formatPhoneState}
                />
              )}
            </ModifyModal>
          </div>
          <div className="profile-container">
            <section className="profile-info">
              <div className="container">
                <h2>Contact Info</h2>

                <div className="info-section">
                  <p className="subtitle">Names:</p>
                  {event && (
                    <p>
                      {event.first_name} & {event.second_name}
                    </p>
                  )}
                </div>
                <div className="info-section">
                  <p className="subtitle">Date:</p>
                  {event && <p>{formatDateOutput(event.event_date)}</p>}
                </div>
                <div className="info-section">
                  <p className="subtitle">Email:</p>
                  {event && <p>{event.email}</p>}
                </div>
                <div className="info-section">
                  <p className="subtitle">Phone:</p>
                  {event && <p>{formatPhoneState(event.phone)}</p>}
                </div>
                <div className="info-section">
                  <p className="subtitle">Address:</p>
                  {event && (
                    <p>
                      {event.unit} {event.street_number}, {event.street_name} {event.street_type}, {event.postal_code},{" "}
                      {event.city}
                    </p>
                  )}
                </div>
              </div>
            </section>

            <section className="progress-info">
              <div className="container">
                <div className="content">
                  <div className="budget">
                    <h2>Budget</h2>

                    <div className="info-section">
                      <p className="subtitle">Event Budget:</p>
                      {event && <p>{formatMoneyOutput(event.expense_budget)}</p>}
                    </div>

                    <div className="info-section">
                      <p className="subtitle">Expense Total:</p>
                      {event && <p>{formatMoneyOutput(event.expense_actual)}</p>}
                    </div>

                    <div className="progress-circle">
                      {event && <Pie className="pie" percentage={budgetPercent} colour="rgb(130, 156, 167)" />}
                    </div>
                  </div>
                </div>

                <div className="content">
                  <div className="tasks-complete">
                    <h2>Tasks Completed</h2>
                    <div className="progress-circle">
                      <Pie className="pie" percentage={completionPercent} colour="rgb(130, 156, 167)" />
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <div className="btn-container">
              <Link className="button" to={`/board?eventId=${eventId}`}>
                View Board
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

// Profile.propTypes = {

// };

export default withDashboard(Profile);
