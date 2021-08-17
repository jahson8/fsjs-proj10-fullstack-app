//* React React Router imports
import React from "react";
import { Link } from "react-router-dom";

const UnhandledError = () => {
  return (
    <main>
      <div className="wrap">
        <h2>Error</h2>
        <p>
          Oops! There seems to be a problem. Please try your request again
          later. Return to <Link to="/">Homepage Page</Link>
        </p>
      </div>
    </main>
  );
};

export default UnhandledError;
