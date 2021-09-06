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

export default function Swimlane({ column, children, onDragEnter, title, id }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="column" onDragEnter={onDragEnter}>
      <div className="column-title">
        <p className="title">{title}</p>
        <i className="fas fa-ellipsis-h options-btn" onClick={(e) => setIsOpen(true)}></i>
        <ModifyModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <ModifyColumnForm column={column} />
        </ModifyModal>
      </div>

      {children}
    </div>
  );
}
