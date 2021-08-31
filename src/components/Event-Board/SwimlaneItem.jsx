import React, { Fragment } from "react";
// import PropTypes from "prop-types";

export default function SwimlaneItem({ item, onDragStart, onDragEnter, className }) {
  return (
    <div draggable onDragStart={onDragStart} onDragEnter={onDragEnter} className={className}>
      <div className="item__container">
        <p className="item__title">{item.title}</p>
        <p className="item__desc">{item.content} </p>
      </div>
    </div>
  );
}
