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



  // This was updateColumns
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

  const addEvent = async (formData, user) => {
    // *_*_*_*_*_*_*_*_*_*_*_* MOVE THE LOGIC FROM NewEvent COMPONENT *_*_*_*_*_*_*_*_*_*_*_*

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
      // Figure out how to switch form state to false
      // setFormComplete(true);
    } catch {
      console.log("ERROR in addEvent function inside NewEvent component");
    }



    // --------------------------- Old:
    // const params = new URLSearchParams(document.location.search.substring(1));
    // const eventId = params.get("eventId");

    // try {
    //   await apiRequest(`${process.env.REACT_APP_API_URL}/board/${eventId}/add`, {
    //     body: JSON.stringify(data),
    //     headers: { "Content-Type": "application/json" },
    //   });
    //   // setEventBoardData(data);
    //   getEvents();
    // } catch (err) {
    //   console.log(err);
    // }
  };




  // --------------------------- Old:   - (Duplicate of above?)
  // const updateTask = async (data) => {
  //   const params = new URLSearchParams(document.location.search.substring(1));
  //   const eventId = params.get("eventId");

  //   try {
  //     console.log(data);
  //     await apiRequest(`${process.env.REACT_APP_API_URL}/task/${eventId}/update`, {
  //       body: JSON.stringify(data),
  //       headers: { "Content-Type": "application/json" },
  //     });
  //     getEvents();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };



  const deleteEvent = async (data) => {



    // --------------------------- Old:
    // const params = new URLSearchParams(document.location.search.substring(1));
    // const eventId = params.get("eventId");

    // try {
    //   console.log("Deleted ", data);
    //   await apiRequest(`${process.env.REACT_APP_API_URL}/task/${eventId}/delete`, {
    //     body: JSON.stringify(data),
    //     headers: { "Content-Type": "application/json" },
    //   });
    //   // setEventBoardData(data);
    //   getEvents();
    // } catch (err) {
    //   console.log(err);
    // }
  };



  return (
    // --------------------------- Old:
    // <DashboardContext.Provider value={{ data, setEventBoardData, updateColumns, addTask, updateTask, deleteTask }}>
    // --------------------------- New:
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
