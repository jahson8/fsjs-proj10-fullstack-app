//* React React Router imports
import React from "react";
import { Link, useLocation } from "react-router-dom";

const ActionsBar = ({ handleShow }) => {
  let { pathname } = useLocation();

  return (
    <div className="actions--bar">
      <div className="wrap">
        <Link className="button" to={pathname + "/update"}>
          Update Course
        </Link>
        <Link className="button" onClick={handleShow}>
          Delete Course
        </Link>
        <Link className="button button-secondary" to="/">
          Return to List
        </Link>
      </div>
    </div>
  );
};

export default ActionsBar;
