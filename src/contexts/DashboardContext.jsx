import React, { useState, useEffect } from "react";
import { apiRequest } from "../../src/utils/apiUtils";

export const DashboardContext = React.createContext();

const DashboardContextProvider = ({ children }) => {
  const [events, setEvents] = useState();
  const [data, setDashboardData] = useState();

  useEffect(() => {
    getEvents();
  }, [data]);

  const getEvents = () => {
    apiRequest(`${process.env.REACT_APP_API_URL}/events`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => setEvents(data));
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
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DashboardContext.Provider value={{ events, getEvents, setEvents, addEvent, updateEvent, deleteEvent }}>
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
