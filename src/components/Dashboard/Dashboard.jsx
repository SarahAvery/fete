import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useUser } from "../../contexts/UserContext";
import { apiRequest } from "../../utils/apiUtils";
import { RouteList } from "../Routes";
import { Link } from "react-router-dom";
// import PropTypes from "prop-types";
import DashboardItem from "./DashboardItem";

export default function Dashboard(props) {
  const { user } = useUser();
  console.log("user ", user);

  const [events, setEvents] = useState();
  useEffect(() => {
    apiRequest(`${process.env.REACT_APP_API_URL}/events`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  return (
    <div className="Dashboard">
      <h1>Dashboard</h1>
      <Link to={RouteList.newevent}><h3 class="new-event-btn">New Event</h3></Link>
      <ul>
        {events?.map((event) => (
          <DashboardItem key={event.event_id} {...event} />
        ))}
      </ul>
    </div>
  );
}

// Dashboard.propTypes = {
//   events: PropTypes.array,

//   key: PropTypes.number,

// };
