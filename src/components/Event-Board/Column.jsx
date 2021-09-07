import React, { useState } from "react";
import Modal from "../Modal";
import ModifyColumnForm from "./ModifyColumnForm";

// import PropTypes from "prop-types";

const ModifyModal = ({ isOpen, onClose, children }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {children}
    </Modal>
  );
};

export default function Column({ column, children, onDragEnter, title, id, onClose }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="column" onDragEnter={onDragEnter}>
      <div className="column-title">
        <p className="title">{title}</p>
        <i className="fas fa-pen fa-xs options-btn" onClick={(e) => setIsOpen(true)}></i>
        <ModifyModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <ModifyColumnForm column={column} onClose={onClose} />
        </ModifyModal>
      </div>

      {children}
    </div>
  );
}
