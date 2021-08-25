import React from "react";
import DashboardItem from "../components/Dashboard/DashboardItem";

// const event = {
//   id: 1,
//   title: "Sam and Janine's Wedding",
//   first_name: "Sam Hutching",
//   second_name: "Janine Deval",
//   weekday: "Saturday",
//   month: "July",
//   day: 23,
//   year: 2022,
//   email: "samh@email.com",
//   phone: 5559686412,
//   unit: null,
//   street_number: 1613,
//   street_name: "New",
//   type: "Rd",
//   postal: "M4T 2T1",
//   city: "Toronto",
//   percent: 46,
// },

export default {
  title: "DashboardItem",
  component: DashboardItem,
  parameters: {
    backgrounds: {
      default: "light",
      values: [{ name: "light", value: "#fff" }],
    },
  },
};

const Template = (args) => <DashboardItem {...args} />;

export const Base = Template.bind({});
Base.args = {
  // event: event,
};
// Disabled.argTypes = {
//   onClick: { action: "button-clicked"}
// }
