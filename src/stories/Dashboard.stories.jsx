import React from "react";
import Dashboard from "../components/Dashboard/Dashboard";

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

export default {
  title: "Dashboard",
  component: Dashboard,
  parameters: {
    backgrounds: {
      default: "light",
      values: [{ name: "light", value: "#fff" }],
    },
  },
};

const Template = (args) => <Dashboard {...args} />;

export const Base = Template.bind({});
Base.args = {
  events: events,
};
// Disabled.argTypes = {
//   onClick: { action: "button-clicked"}
// }
