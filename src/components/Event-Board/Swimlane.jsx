import React from "react";

// import PropTypes from "prop-types";

export default function Swimlane({ children, onDragEnter, title }) {
  return (
    <div className="column" onDragEnter={onDragEnter}>
      <div className="column-title">
        <p className="title">{title}</p>
        <i className="fas fa-ellipsis-h options-btn"></i>
      </div>

      {children}
    </div>
  );
}
