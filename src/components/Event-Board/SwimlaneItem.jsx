import React, { useState } from "react";
import Modal from "../Modal";
import ModifyForm from "./ModifyForm";

// import PropTypes from "prop-types";

const ModifyModal = ({ isOpen, onClose, children }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {children}
    </Modal>
  );
};

export default function SwimlaneItem({ item, onDragStart, onDragEnter, className }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div draggable onDragStart={onDragStart} onDragEnter={onDragEnter} className={className}>
      <div className="item__container">
        <div className="item-title-container">
          <p className="item__title">{item.title}</p>
          <i className="fas fa-ellipsis-h options-btn" onClick={(e) => setIsOpen(true)}></i>
          <ModifyModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <ModifyForm task={item} />
          </ModifyModal>
        </div>
        <p className="item__desc">{item.content} </p>
      </div>
    </div>
  );
}
