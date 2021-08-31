import React, { Fragment } from "react";
// import PropTypes from "prop-types";

export default function Swimlane({ children, onDragEnter, title }) {
  return (
    <div className="swimlane" onDragEnter={onDragEnter}>
      <div className="swim-title">{title}</div>
      {children}
    </div>
  );
}
