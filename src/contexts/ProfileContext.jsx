import React, { useState, useEffect } from "react";
import { apiRequest } from "../../src/utils/apiUtils";

export const ProfileContext = React.createContext();

const ProfileContextProvider = ({ children }) => {
  const [event, setEvent] = useState();
  const [data, setProfileData] = useState();

  useEffect(() => {
    getEvent();
  }, [data]);

  // Using its own route:
  // const getEvent = async () => {
  //   const params = new URLSearchParams(document.location.search.substring(1));
  //   const eventId = params.get("eventId");
  //   // console.log('eventId in ProfileContext.jsx', eventId)

  //   apiRequest(`${process.env.REACT_APP_API_URL}/events/${eventId}/single`, { method: "GET" })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       // console.log('data.rows[0]: ', data.rows[0])
  //       console.log('data in ProfileContext: ', data[0])
  //       setEvent(data[0])
  //       return data[0]
  //     });
  // };

  // Sharing a route:
  const getEvent = async () => {
    const params = new URLSearchParams(document.location.search.substring(1));
    const eventId = params.get("eventId");
    console.log('eventId in ProfileContext.jsx', eventId)

    apiRequest(`${process.env.REACT_APP_API_URL}/events`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        console.log('data in ProfileContext: ', data)
        data.forEach(event => {
          if (event.event_id == eventId) {
            console.log('event in ProfileContext: ', event)
            setEvent(event)
            return event
          }
        })
      });
  };

  /*
  getEvents returned object:
  {
    "id": 1,
    "title": "F&G wedding",
    "first_name": "Frank Alistair",
    "second_name": "Georgia Green",
    "event_date": "2016-06-23T02:10:25.000Z",
    "email": "fngwedding@email.com",
    "phone": "4168261456",
    "unit": "23A",
    "street_number": "145",
    "street_name": "Brooklands",
    "street_type": "Place",
    "postal_code": "M2X 4W9",
    "city": "Cityville",
    "date_created": "2021-09-06T01:21:20.536Z",
    "expense_budget": 5000,
    "expense_actual": 0,
    "completed_tasks": "0"
  }
  */


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
      setProfileData(formData);
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
      setProfileData(data);
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
      setProfileData(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ProfileContext.Provider value={{ event, getEvent, setEvent, addEvent, updateEvent, deleteEvent }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const withProfile = (Component) => (props) => (
  <ProfileContextProvider>
    <Component {...props} />
  </ProfileContextProvider>
);

export const useProfile = () => {
  const context = React.useContext(ProfileContext);

  if (context === undefined) {
    throw new Error("useProfile must be used within a UserProvider");
  }

  return context;
};
