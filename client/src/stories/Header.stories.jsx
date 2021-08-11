import React, { Fragment } from "react";
import Header from "../components/Header/Header";

export default {
  title: "Header",
  component: Header,
  parameters: {
    backgrounds: {
      default: "light",
      values: [{ name: "light", value: "#fff" }],
    },
  },
};

const Template = (args) => <Header {...args} />;

export const Base = Template.bind({});
// Disabled.args = {
//   disabled: true,
//   children: "Disabled",
// }
// Disabled.argTypes = {
//   onClick: { action: "button-clicked"}
// }
