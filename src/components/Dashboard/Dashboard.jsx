import React from "react";
import { useState } from "react";
import DashboardItem from "./DashboardItem";
import { useDashboard, withDashboard } from "../../contexts/DashboardContext";
import NewEvent from "./NewEvent";
import Modal from "../Modal";

import "react-datepicker/dist/react-datepicker.css";

const Dashboard = () => {
  const [form, setForm] = useState({ visible: false });
  const { events } = useDashboard();

  const openForm = () => {
    setForm({ visible: true });
  };

  const closeForm = () => {
    setForm({ visible: false });
  };

  return (
    <div className="Dashboard ">
      <div className="wrapper">
        <div className="header-banner">
          <h1>Dashboard</h1>
          <div className="add-event-btn-container">
            <button className="new-event-btn button" onClick={() => openForm()}>
              New Event
            </button>
          </div>
        </div>
        {form && (
          <div>
            <Modal isOpen={form.visible} onClose={() => setForm({ ...form, visible: false })}>
              <NewEvent closeForm={closeForm} />
            </Modal>
          </div>
        )}
        <ul>
          {events?.map((event) => (
            <DashboardItem key={event.event_id} {...event} closeForm={closeForm} openForm={openForm} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default withDashboard(Dashboard);
