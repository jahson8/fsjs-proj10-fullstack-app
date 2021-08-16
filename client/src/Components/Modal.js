//* React
import React from "react";
import { Link } from "react-router-dom";

const Modal = ({ handleClose, handleDelete, show }) => {
  // * Shows or hides the modal
  const showHideClassName = show
    ? "modal modal-display-block"
    : "modal modal-display-none";

  return (
    <div className={showHideClassName}>
      <div className="modal--content">
        <h2>Are you sure you want to delete this course? </h2>
        <p>Please be aware that deletion is permanent and cannot be undone.</p>
        <ul className="modal--btngroup">
          <li>
            <Link className="modal--btngroup--btn" onClick={handleClose} to="">
              Cancel
            </Link>
          </li>
          <li>
            <Link className="modal--btngroup--btn" onClick={handleDelete} to="">
              Delete
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Modal;
