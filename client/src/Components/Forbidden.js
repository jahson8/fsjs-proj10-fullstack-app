//* React React Router imports
import React from "react";
import { Link } from "react-router-dom";

const Forbidden = () => {
  return (
    <main>
      <div className="wrap">
        <h2>Forbidden</h2>
        <p>
          Sorry! You are not authorized to make changes to this course. Return
          to <Link to="/">Homepage Page</Link>
        </p>
      </div>
    </main>
  );
};

export default Forbidden;
