import React, { Fragment } from "react";
// import PropTypes from "prop-types";

export default function Item(props) {
  return (
    <Fragment>
      <div className="dnd-item">
        <div className="dnd-item__container">
          <p className="dnd-item__title">Item Title</p>
          <p className="dnd-item__desc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae pariatur ex dicta adipisci illo.
          </p>
        </div>
      </div>
    </Fragment>
  );
}
