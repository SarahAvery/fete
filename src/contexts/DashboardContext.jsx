import React, { useState, useEffect } from "react";
import { apiRequest } from "../../src/utils/apiUtils";

export const DashboardContext = React.createContext();

const DashboardContextProvider = ({ children }) => {
  const [events, setEvents] = useState();
  const [data, setDashboardData] = useState();

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = () => {
    apiRequest(`${process.env.REACT_APP_API_URL}/events`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => setEvents(data));
  };

  const addEvent = async (formData, user) => {
    const userId = user.id;
    console.log("userId inside addEvent: ", userId);
    try {
      await apiRequest(`${process.env.REACT_APP_API_URL}/events/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, userId }),
      });
    } catch {
      console.log("ERROR in addEvent function inside NewEvent component");
    }
  };

  const updateEvent = async (data) => {
    // --------------------------- Old:
    //
    // const params = new URLSearchParams(document.location.search.substring(1));
    // const eventId = params.get("eventId");
    // try {
    //   await apiRequest(`${process.env.REACT_APP_API_URL}/board/${eventId}/update`, {
    //     body: JSON.stringify(data),
    //     headers: { "Content-Type": "application/json" },
    //   });
    //   // setEventBoardData(data);
    //   // getEvents();
    // } catch (err) {
    //   console.log(err);
    // }
  };

  const deleteEvent = async (data) => {};

  return (
    // <DashboardContext.Provider value={{ data, setEventBoardData, updateColumns, addTask, updateTask, deleteTask }}>
    <DashboardContext.Provider value={{ events, setEvents, addEvent, updateEvent, deleteEvent }}>
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
