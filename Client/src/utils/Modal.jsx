import React from 'react';
import ReactDOM from 'react-dom';
import { IoMdClose } from "react-icons/io";

const Modal = ({ children, onClose, type=""}) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-4 md:mx-0">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold">{type=="changePassword"? "Change Password":"Updated Comment"}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <IoMdClose size={"1.5rem"}/>
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
        <div className="p-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('portal-modal') // Ensure this ID exists in your HTML
  );
};

export default Modal;


