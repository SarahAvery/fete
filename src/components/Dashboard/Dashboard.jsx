import React, { Fragment } from "react";
import PropTypes from "prop-types";
import DashboardItem from "./DashboardItem";

export default function Dashboard(props) {
  return (
    <Fragment>
      <h1>Dashboard</h1>
      <ul>
        {props.events.map((event) => (
          <DashboardItem
            key={event.id}
            id={event.id}
            title={event.title}
            first_name={event.first_name}
            second_name={event.second_name}
            weekday={event.weekday}
            month={event.month}
            day={event.day}
            year={event.year}
            email={props.email}
            phone={event.phone}
            unit={event.unit}
            street_number={event.street_number}
            street_name={event.street_name}
            type={event.type}
            postal={event.postal}
            city={event.city}
            percent={event.percent}
          />
        ))}
      </ul>
    </Fragment>
  );
}

Dashboard.propTypes = {
  events: PropTypes.array,
  id: PropTypes.number,
  key: PropTypes.number,
  title: PropTypes.string,
  first_name: PropTypes.string,
  second_name: PropTypes.string,
  weekday: PropTypes.string,
  month: PropTypes.string,
  day: PropTypes.number,
  year: PropTypes.number,
  email: PropTypes.string,
  phone: PropTypes.number,
  unit: PropTypes.number,
  street_number: PropTypes.number,
  street_name: PropTypes.string,
  type: PropTypes.string,
  postal: PropTypes.string,
  city: PropTypes.string,
  percent: PropTypes.number,
};
