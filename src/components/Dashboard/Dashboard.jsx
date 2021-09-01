import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useUser } from "../../contexts/UserContext";
import { apiRequest } from "../../utils/apiUtils";
import DashboardItem from "./DashboardItem";
import NewEvent from "./NewEvent";
import Modal from "../Modal";

export default function Dashboard(props) {
  const [form, setForm] = useState({ visible: false });

  const openForm = () => {
    setForm({ visible: true });
  };

  const { user } = useUser();

  const [events, setEvents] = useState();
  useEffect(() => {
    apiRequest(`${process.env.REACT_APP_API_URL}/events`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  return (
    <div className="wrapper">
      <div className="Dashboard ">
        <h1>Dashboard</h1>

        <div className="add-event-btn-container">
          <button class="new-event-btn button" onClick={() => openForm()}>
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
