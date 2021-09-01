import React, { useState, render, useEffect } from "react";
import Button from "../Button";
// import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { apiRequest } from "../../utils/apiUtils";

const NewEvent = () => {
  // state for form entry fields
  const [eventTitle, setEventTitle] = useState();
  const [firstName, setFirstName] = useState();
  const [secondName, setSecondName] = useState();
  const [eventDate, setEventDate] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [unit, setUnit] = useState();
  const [streetNo, setStreetNo] = useState();
  const [streetName, setStreetName] = useState();
  const [streetType, setStreetType] = useState();
  const [postal, setPostal] = useState();
  const [city, setCity] = useState();

  const { user } = useUser();
  const [formComplete, setFormComplete] = useState(false);

  const formData = {
    eventTitle,
    firstName,
    secondName,
    eventDate,
    email,
    phone,
    unit,
    streetNo,
    streetName,
    streetType,
    postal,
    city,
  };

  // Timestamp for testing form entry:
  // 2016-06-22 22:10:25-04

  // Will be broken out:
  const addEvent = async (formData, user) => {
    console.log("formData inside addEvent: ", formData);
    console.log("user inside addEvent: ", user);
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
      setFormComplete(true);
    } catch {
      console.log("ERROR in addEvent function inside NewEvent component");
    }
  };

  return (
    <div className="login-container wrapper">
      <h2>Add New Event</h2>
      {formComplete ? (
        <Redirect to="/dashboard" />
      ) : (
        <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <div>
              <label htmlFor="event_title">Event Title:</label>
              <input
                type="text"
                name="first_name"
                placeholder="X & X are tying the knot"
                required
                onChange={(e) => setEventTitle(e.target.value)}
              />
            </div>

            <div>
              <p>To Be Married:</p>
              <label htmlFor="first_name" class="visually-hidden">
                Person 1:
              </label>
              <input
                type="text"
                name="first_name"
                placeholder="Name"
                required
                onChange={(e) => setFirstName(e.target.value)}
              />
              <label htmlFor="second_name" class="visually-hidden">
                Person 2:
              </label>
              <input
                type="text"
                name="second_name"
                placeholder="Name"
                required
                onChange={(e) => setSecondName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="event_date">Event Date:</label>
              <input name="event_date" required onChange={(e) => setEventDate(e.target.value)} />
            </div>

            <div>
              <label htmlFor="email">email:</label>
              <input
                type="email"
                name="email"
                placeholder="email@email.com"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="phone">Phone: </label>
              <input type="text" name="phone" required onChange={(e) => setPhone(e.target.value)} />
            </div>

            <div>
              <label htmlFor="unit">Unit: </label>
              <input type="text" name="unit" required onChange={(e) => setUnit(e.target.value)} />
            </div>

            <div>
              <label htmlFor="street_number">Street No.: </label>
              <input type="text" name="street_number" required onChange={(e) => setStreetNo(e.target.value)} />
            </div>

            <div>
              <label htmlFor="street_name">Street Name: </label>
              <input type="text" name="street_name" required onChange={(e) => setStreetName(e.target.value)} />
            </div>

            <div>
              <label htmlFor="street_type">Street Type: </label>
              <input type="text" name="street_type" required onChange={(e) => setStreetType(e.target.value)} />
            </div>

            <div>
              <label htmlFor="postal_code">Postal Code: </label>
              <input type="text" name="postal_code" required onChange={(e) => setPostal(e.target.value)} />
            </div>

            <div>
              <label htmlFor="city">City: </label>
              <input type="text" name="city" required onChange={(e) => setCity(e.target.value)} />
            </div>

            <div className="btn-container">{<Button onClick={() => addEvent(formData, user)}>Save Event</Button>}</div>
          </div>
        </form>
      )}
    </div>
  );
};

NewEvent.propTypes = {
  // onNewEvent: PropTypes.func,
};

export default NewEvent;
