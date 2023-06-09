import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ close, children }) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      {children}
    </div>,
    document.getElementById("root-modals")
  );
};

export default Modal;
