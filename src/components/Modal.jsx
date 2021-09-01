import React, { Fragment, useEffect } from "react";
import ReactDOM from "react-dom";

const Modal = ({ children, onClose, isOpen }) => {
  const onModalClose = () => {
    onClose && onClose();
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEsc);

    return () => document.removeEventListener("keydown", handleEsc);
  });

  const handleEsc = (e) => {
    if (e.key === "Escape") {
      onModalClose();
    }
  };

  return (
    <Fragment>
      {isOpen &&
        ReactDOM.createPortal(
          <div className="modal-container">
            <div className="modal">
              <button onClick={onModalClose}>X</button>
              {children}
            </div>
          </div>,
          document.getElementById("modal")
        )}
    </Fragment>
  );
};

export default Modal;
