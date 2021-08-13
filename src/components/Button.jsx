/* eslint-disable react/no-typos */
import React from "react";
import PropTypes from "prop-types";
// import "components/Button.scss";
// import classNames from "classnames";

export default function Button(props) {
  return <button onClick={props.onClick}>{props.children}</button>;
}

Button.propTypes = {
  // danger: PropTypes.bool,
  // confirm: PropTypes.bool,
  // disabled: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
};
