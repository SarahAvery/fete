
import React, { useState, useEffect } from "react";
import { apiRequest } from "../../src/utils/apiUtils";


export const DashboardContext = React.createContext();
console.log('FDSJKLAFDLJKSFDSJKLFDJKL;SADFJKSL')

const DashboardContextProvider = ({ children }) => {
  // const [data, setDashboardData] = useState();
  const [events, setEvents] = useState();

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = () => {
    apiRequest(`${process.env.REACT_APP_API_URL}/events`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        console.log('data in DashboardContext: ', data)
        setEvents(data)});

  };

  // *_*_*_*_*_*_*_*_*_*_*_* useState 'events' used to be called 'data' *_*_*_*_*_*_*_*_*_*_*_*


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

  const addEvent = async (data) => {
    // *_*_*_*_*_*_*_*_*_*_*_* MOVE THE LOGIC FROM NewEvent COMPONENT *_*_*_*_*_*_*_*_*_*_*_*

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
    <DashboardContext.Provider value={{ events, setEvents }}>
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
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
