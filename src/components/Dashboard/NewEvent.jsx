import React, { useState, render, useEffect } from "react";
import Button from "../Button";
// import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { apiRequest } from "../../utils/apiUtils";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Fragment } from "react";

const NewEvent = () => {
  // state for form entry fields
  const [eventTitle, setEventTitle] = useState();
  const [firstName, setFirstName] = useState();
  const [secondName, setSecondName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [unit, setUnit] = useState();
  const [streetNo, setStreetNo] = useState();
  const [streetName, setStreetName] = useState();
  const [streetType, setStreetType] = useState();
  const [postal, setPostal] = useState();
  const [city, setCity] = useState();
  const [date, setDate] = useState();

  const { user } = useUser();
  const [formComplete, setFormComplete] = useState(false);

  const formData = {
    eventTitle,
    firstName,
    secondName,
    date,
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
    // console.log("formData inside addEvent: ", formData);
    // console.log("user inside addEvent: ", user);
    const userId = user.id;
    // console.log("userId inside addEvent: ", userId);
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
    <Fragment>
      {formComplete ? (
        <Redirect to="/dashboard" />
      ) : (
        <div className="new-event-container wrapper">
          <h2>Add New Event</h2>
        <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <div className="event-title container">
              <label htmlFor="event_title">Event Title:</label>
              <input
                type="text"
                name="event_title"
                placeholder="X & X are tying the knot"
                required
                onChange={(e) => setEventTitle(e.target.value)}
              />
            </div>

            <div className="couple container">
              <p className="label">To Be Married:</p>
              <label htmlFor="first_name" className="visually-hidden">
                Person 1:
              </label>
              <input
                type="text"
                name="first_name"
                placeholder="Full Name"
                required
                onChange={(e) => setFirstName(e.target.value)}
              />
              <label htmlFor="second_name" className="visually-hidden">
                Person 2:
              </label>
              <span>&</span>
              <input
                type="text"
                name="second_name"
                placeholder="Full Name"
                required
                onChange={(e) => setSecondName(e.target.value)}
              />
            </div>

            <div className="contact container">
              <div className="contact-info">
                <label htmlFor="email">Email:</label>
                <input
                  type="text"
                  name="event_title"
                  placeholder="X & X are tying the knot"
                  required
                  onChange={(e) => setEventTitle(e.target.value)}
                />
              </div>
              <div className="couple container">
                <p className="label">To Be Married:</p>
                <label htmlFor="first_name" className="visually-hidden">
                  Person 1:
                </label>
                <input
                  type="text"
                  name="first_name"
                  placeholder="Full Name"
                  required
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <label htmlFor="second_name" className="visually-hidden">
                  Person 2:
                </label>
                <span>&</span>
                <input
                  type="text"
                  name="second_name"
                  placeholder="Full Name"
                  required
                  onChange={(e) => setSecondName(e.target.value)}
                />
              </div>
              <div className="contact container">
                <div className="contact-info">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="email@email.com"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="contact-info">
                  <label htmlFor="phone">Phone: </label>
                  <input
                    type="tel"
                    name="phone"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    placeholder="123-456-7890"
                    required
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="address container">
                <div className="unit">
                  <label htmlFor="unit">Unit: </label>
                  <input type="text" name="unit" required onChange={(e) => setUnit(e.target.value)} />
                </div>
                <div className="s-number">
                  <label htmlFor="street_number">Street No.: </label>
                  <input type="text" name="street_number" required onChange={(e) => setStreetNo(e.target.value)} />
                </div>
                <div className="s-name">
                  <label htmlFor="street_name">Street Name: </label>
                  <input type="text" name="street_name" required onChange={(e) => setStreetName(e.target.value)} />
                </div>
                <div className="s-type">
                  <label htmlFor="street_type">Street Type: </label>
                  <input type="text" name="street_type" required onChange={(e) => setStreetType(e.target.value)} />
                </div>
                <div className="postal">
                  <label htmlFor="postal_code">Postal Code: </label>
                  <input type="text" name="postal_code" required onChange={(e) => setPostal(e.target.value)} />
                </div>
                <div className="city">
                  <label htmlFor="city">City: </label>
                  <input type="text" name="city" required onChange={(e) => setCity(e.target.value)} />
                </div>
              </div>

              <div className="datepicker container">
                <label htmlFor="date">Event Date:</label>
                <DatePicker
                  wrapperClassName="datePicker"
                  selected={date}
                  onChange={(date) => setDate(date)}
                  dateFormat="Pp"
                />
              </div>

              <div className="btn-container">
                {<Button onClick={() => addEvent(formData, user)}>Save Event</Button>}
              </div>
            </div>
          </form>
        </div>
      )}
    </Fragment>
  );
};

NewEvent.propTypes = {
  // onNewEvent: PropTypes.func,
};

export default NewEvent;
