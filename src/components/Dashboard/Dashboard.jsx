import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import DashboardItem from "./DashboardItem";
import { useDashboard, withDashboard } from "../../contexts/DashboardContext";
import NewEvent from "./NewEvent";
import Modal from "../Modal";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Dashboard = () => {
  const [form, setForm] = useState({ visible: false });
  const { events, updateEvents, setEvents } = useDashboard();

  const openForm = () => {
    setForm({ visible: true });
  };



  // BEGIN Examples From EventBoard:

















  // END Examples From EventBoard:


  return (
    <div className="wrapper">
      <div className="Dashboard ">
        <h1>Dashboard</h1>
        {/* <DatePicker wrapperClassName="datePicker" selected={date} onChange={(date) => setDate(date)} showTimeSelect dateFormat="Pp" /> */}


        <div className="add-event-btn-container">
          <button className="new-event-btn button" onClick={() => openForm()}>
            New Event
          </button>
        </div>
        <div>
          <Modal isOpen={form.visible} onClose={() => setForm({ ...form, visible: false })}>
            <NewEvent />
          </Modal>
        </div>
        <ul>
          {events?.map((event) => (
            <DashboardItem key={event.event_id} {...event} />
          ))}
        </ul>
      </div>
    </div>
  );
}

// Dashboard.propTypes = {
//   events: PropTypes.array,

//   key: PropTypes.number,

// };
export default withDashboard(Dashboard);