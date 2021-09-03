import React, { useState, render, useEffect } from "react";
import Button from "../Button";
import { useUser } from "../../contexts/UserContext";
import { useDashboard, withDashboard } from "../../contexts/DashboardContext";
import DatePicker from "react-datepicker";


import "react-datepicker/dist/react-datepicker.css";

const ModifyEventForm = (props) => {
  const { updateEvent, deleteEvent } = useDashboard();
  const event = props.event
  // console.log('event in ModifyEventForm: ', event)

  // Close form on button submit - not implemented currently
  const closeForm = event.close
  

  // Format phone number when it's returned to the form for editing
  const formatPhoneState = (phone) => {
    const hyphenNum = `${phone.slice(0, 3)}-${phone.slice(3, 6)}-${phone.slice(6, 10)}`
    return hyphenNum
  }

  // state for form entry fields
  const [eventTitle, setEventTitle] = useState(event.title);
  const [firstName, setFirstName] = useState(event.first_name);
  const [secondName, setSecondName] = useState(event.second_name);
  const [email, setEmail] = useState(event.email);
  const [phone, setPhone] = useState(formatPhoneState(event.phone));
  const [unit, setUnit] = useState(event.unit);
  const [streetNo, setStreetNo] = useState(event.street_number);
  const [streetName, setStreetName] = useState(event.street_name);
  const [streetType, setStreetType] = useState(event.street_type);
  const [postal, setPostal] = useState(event.postal_code);
  const [city, setCity] = useState(event.city);


  // const [date, setDate] = useState(event.event_date);
  // Above is currently an error - Being returned to the form as a timestamptz 
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


  const validate = (formData, eventId) => {
    // console.log('eventId in ModifyEventForm: ', eventId)
    // if (!formData) {
    //   // setError("Please fill in the missing fields");
    //   return;
    // }
    // const data = {formData, eventId}
    // console.log('data in ModifyEventForm: ', data)

    // setError("");
    updateEvent(formData, eventId);
    closeForm()
  };

  const onDelete = () => {
    deleteEvent({ id: event.event_id });
    closeForm()
  };

  return (
    <div className="new-event-container wrapper">
      <h2>Modify Event</h2>
      <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <div className="event-title container">
            <label htmlFor="event_title">Event Title:</label>
            <input
              type="text"
              name="event_title"
              placeholder="X & X are tying the knot"
              required
              value={eventTitle}
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
              value={firstName}
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
              value={secondName}
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
                value={email}
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
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
          <div className="address container">
            <div className="unit">
              <label htmlFor="unit">Unit: </label>
              <input type="text" name="unit" required value={unit} onChange={(e) => setUnit(e.target.value)} />
            </div>
            <div className="s-number">
              <label htmlFor="street_number">Street No.: </label>
              <input type="text" name="street_number" required value={streetNo} onChange={(e) => setStreetNo(e.target.value)} />
            </div>
            <div className="s-name">
              <label htmlFor="street_name">Street Name: </label>
              <input type="text" name="street_name" required value={streetName} onChange={(e) => setStreetName(e.target.value)} />
            </div>
            <div className="s-type">
              <label htmlFor="street_type">Street Type: </label>
              <input type="text" name="street_type" required value={streetType} onChange={(e) => setStreetType(e.target.value)} />
            </div>
            <div className="postal">
              <label htmlFor="postal_code">Postal Code: </label>
              <input type="text" name="postal_code" required value={postal} onChange={(e) => setPostal(e.target.value)} />
            </div>
            <div className="city">
              <label htmlFor="city">City: </label>
              <input type="text" name="city" required value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
          </div>
          <div className="datepicker container">
            <label htmlFor="date">Event Date:</label>
            <DatePicker
              wrapperClassName="datePicker"
              selected={date}
              onChange={(date) => setDate(date)}
              dateFormat="Pp"
              value={date}
            />
          </div>
          <div className="btn-container">
            {<Button onClick={() => validate(formData, event.event_id)}>Update</Button>}
          </div>
          <div className="btn-container">
            {<Button onClick={() => onDelete()}>Delete</Button>}
          </div>
        </div>
      </form>
    </div>
  );
};

ModifyEventForm.propTypes = {
  // onNewEvent: PropTypes.func,
};

export default ModifyEventForm;
