import React from "react";
import Signup from "../components/Login-Signup/Signup";

export default {
  title: "Signup",
  component: Signup,
  parameters: {
    backgrounds: {
      default: "light",
      values: [{ name: "light", value: "#fff" }],
    },
  },
};

const Template = (args) => <Signup {...args} />;

export const Base = Template.bind({});
// Disabled.args = {
//   disabled: true,
//   children: "Disabled",
// }
// Disabled.argTypes = {
//   onClick: { action: "button-clicked"}
// }
