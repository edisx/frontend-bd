import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { X } from "react-feather";

const Modal = ({ isOpen, onClose, size, children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }

    if (isOpen) {
      window.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div
        ref={modalRef}
        className={`relative bg-white rounded ${size} min-h-[200px] p-4`}
      >
        <button className="absolute top-2 right-2 p-2" onClick={onClose}>
          <X />
        </button>
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  size: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Modal.defaultProps = {
  size: "w-1/2 h-auto",
};

export default Modal;
