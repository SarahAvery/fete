import React, { useState, render, useEffect } from "react";
import Button from "../Button";
import { useUser } from "../../contexts/UserContext";
import { useDashboard, withDashboard } from "../../contexts/DashboardContext";
import DatePicker from "react-datepicker";


import "react-datepicker/dist/react-datepicker.css";

const NewEvent = (props) => {
  const { addEvent } = useDashboard();
  const { closeForm } = props
  const { user } = useUser();

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

  function addNewEvent(formData, user) {
    addEvent(formData, user);
    closeForm()
  }

  return (
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
          <div className="btn-container">{<Button onClick={() => addNewEvent(formData, user)}>Save Event</Button>}</div>
        </div>
      </form>
    </div>
  );
};

NewEvent.propTypes = {
  // onNewEvent: PropTypes.func,
};

export default NewEvent;
