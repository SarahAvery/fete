import React, { Fragment } from "react";
// import PropTypes from "prop-types";
import DashboardItem from "./DashboardItem";

// Dashboard
const events = [
  {
    id: 1,
    title: "Sam and Janine's Wedding",
    first_name: "Sam Hutching",
    second_name: "Janine Deval",
    weekday: "Saturday",
    month: "July",
    day: 23,
    year: 2022,
    email: "samh@email.com",
    phone: 5559686412,
    unit: null,
    street_number: 1613,
    street_name: "New",
    type: "Rd",
    postal: "M4T 2T1",
    city: "Toronto",
    percent: 46,
  },
  {
    id: 2,
    title: "John and Dan's Wedding",
    first_name: "John Moore",
    second_name: "Dan Mathers",
    weekday: "Friday",
    month: "December",
    day: 13,
    year: 2021,
    email: "danm@email.com",
    phone: 9045555555,
    unit: 5,
    street_number: 253,
    street_name: "lakeshore",
    type: "Dr",
    postal: "L7T 4R5",
    city: "Orillia",
    percent: 76,
  },
];
export default function Dashboard(props) {
  return (
    <Fragment>
      <h1>Dashboard</h1>
      <ul>
        {events.map((event) => (
          <DashboardItem key={event.id} {...event} />
        ))}
      </ul>
    </Fragment>
  );
}

// Dashboard.propTypes = {
//   events: PropTypes.array,

//   key: PropTypes.number,

// };
