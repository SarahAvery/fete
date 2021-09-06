import React, { useState, useEffect } from "react";
import Button from "../Button";
import { useDashboard } from "../../contexts/DashboardContext";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const ModifyEventForm = (props) => {
  const { updateEvent, deleteEvent } = useDashboard();
  const { closeForm } = props;
  const event = props.event;
  const formatDate = props.dateFormat;
  const formatPhone = props.phoneFormat;

  // state for form entry fields
  const [eventTitle, setEventTitle] = useState(event.title);
  const [firstName, setFirstName] = useState(event.first_name);
  const [secondName, setSecondName] = useState(event.second_name);
  const [email, setEmail] = useState(event.email);
  const [phone, setPhone] = useState(formatPhone(event.phone));
  const [unit, setUnit] = useState(event.unit || "");
  const [streetNo, setStreetNo] = useState(event.street_number);
  const [streetName, setStreetName] = useState(event.street_name);
  const [streetType, setStreetType] = useState(event.street_type);
  const [postal, setPostal] = useState(event.postal_code);
  const [city, setCity] = useState(event.city);
  const [date, setDate] = useState(event.event_date);
  const [newDate, setNewDate] = useState();
  const [budget, setBudget] = useState(event.expense_budget);
  const [currentBudget, setCurrentBudget] = useState(event.expense_budget);

  // set budget to be displayed only on first form render
  useEffect(() => {
    setCurrentBudget(budget);
  }, []);

  useEffect(() => {
    if (newDate) {
      setDate(newDate);
    }
  }, [newDate]);

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
    budget,
  };

  const validate = (formData, eventId) => {
    updateEvent(formData, eventId);
    closeForm();
  };

  const onDelete = () => {
    deleteEvent({ id: event.event_id });
    closeForm();
  };

  return (
    <div className="new-event-container wrapper">
      <h2>Update Event</h2>
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
              <input type="text" name="unit" value={unit} onChange={(e) => setUnit(e.target.value)} />
            </div>
            <div className="s-number">
              <label htmlFor="street_number">Street No.: </label>
              <input
                type="text"
                name="street_number"
                required
                value={streetNo}
                onChange={(e) => setStreetNo(e.target.value)}
              />
            </div>
            <div className="s-name">
              <label htmlFor="street_name">Street Name: </label>
              <input
                type="text"
                name="street_name"
                required
                value={streetName}
                onChange={(e) => setStreetName(e.target.value)}
              />
            </div>
            <div className="s-type">
              <label htmlFor="street_type">Street Type: </label>
              <input
                type="text"
                name="street_type"
                required
                value={streetType}
                onChange={(e) => setStreetType(e.target.value)}
              />
            </div>
            <div className="postal">
              <label htmlFor="postal_code">Postal Code: </label>
              <input
                type="text"
                name="postal_code"
                required
                value={postal}
                onChange={(e) => setPostal(e.target.value)}
              />
            </div>
            <div className="city">
              <label htmlFor="city">City: </label>
              <input type="text" name="city" required value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
          </div>

          <div className="budget container">
            <div className="current-date-container">
              <p>Current Budget:</p>
              <p>{currentBudget}</p>
            </div>
            <div className="event_budget">
              <label htmlFor="event_budget">Update Budget: </label>
              <input type="text" name="event_budget" onChange={(e) => setBudget(e.target.value)} />
            </div>
          </div>

          <div className="datepicker-container">
            <div className="display-event-date">
              <div className="current-date-container">
                <p>Current Date:</p>
                <p>{formatDate(event.event_date)}</p>
              </div>
              <div className="new-date-container">
                <label htmlFor="date">New Date:</label>
                <DatePicker
                  wrapperClassName="datePicker"
                  selected={newDate}
                  onChange={(date) => setNewDate(date)}
                  dateFormat="yyyy-mm-dd"
                />
              </div>
            </div>
          </div>
          <div className="btn-container">
            {<Button onClick={() => validate(formData, event.event_id)}>Update</Button>}
          </div>
          <div className="btn-container">{<Button onClick={() => onDelete()}>Delete</Button>}</div>
        </div>
      </form>
    </div>
  );
};

export default ModifyEventForm;
