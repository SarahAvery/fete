import React, { useState, useEffect } from "react";
import { apiRequest } from "../../src/utils/apiUtils";

export const DashboardContext = React.createContext();

const DashboardContextProvider = ({ children }) => {
  const [events, setEvents] = useState();
  const [data, setDashboardData] = useState();
  const [event, setSingleEvent] = useState();
  const [profileData, setProfileData] = useState();

  useEffect(() => {
    getEvents();
  }, [data]);

  useEffect(() => {
    getEvent();
  }, [profileData]);

  const getEvents = () => {
    apiRequest(`${process.env.REACT_APP_API_URL}/events`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => setEvents(data));
  };

  const getEvent = async () => {
    const params = new URLSearchParams(document.location.search.substring(1));
    const eventId = params.get("eventId");

    apiRequest(`${process.env.REACT_APP_API_URL}/events`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        data.forEach(event => {
          if (String(event.event_id) === eventId) {
            setSingleEvent(event)
            return event
          }
        })
      });
  };

  const addEvent = async (formData, user) => {
    const userId = user.id;
    try {
      await apiRequest(`${process.env.REACT_APP_API_URL}/events/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, userId }),
      });
      setDashboardData(formData);
      setProfileData(formData)
    } catch {
      console.log("ERROR in addEvent function inside NewEvent component");
    }
  };

  const updateEvent = async (data, event) => {
    const eventId = event.id;
    try {
      await apiRequest(`${process.env.REACT_APP_API_URL}/events/${eventId}/update`, {
        body: JSON.stringify({ data, event }),
        headers: { "Content-Type": "application/json" },
      });
      setDashboardData(data);
      setProfileData(data)

    } catch (err) {
      console.log(err);
    }
  };

  const deleteEvent = async (data) => {
    const eventId = data.id;
    try {
      await apiRequest(`${process.env.REACT_APP_API_URL}/events/${eventId}/delete`, {
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      setDashboardData(data);
      setProfileData(data)

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DashboardContext.Provider value={{ data, profileData, event, getEvent, events, getEvents, setEvents, addEvent, updateEvent, deleteEvent }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const withDashboard = (Component) => (props) => (
  <DashboardContextProvider>
    <Component {...props} />
  </DashboardContextProvider>
);

export const useDashboard = () => {
  const context = React.useContext(DashboardContext);

  if (context === undefined) {
    throw new Error("useDashboard must be used within a UserProvider");
  }

  return context;
};
