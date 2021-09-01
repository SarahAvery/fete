import React from "react";
// import PropTypes from "prop-types";

export default function Swimlane({ children, onDragEnter, title }) {
  return (
    <div className="column" onDragEnter={onDragEnter}>
      <div className="column-title">{title}</div>
      {children}
    </div>
  );
}
