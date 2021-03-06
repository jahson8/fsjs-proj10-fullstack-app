//* React React Router imports
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main>
      <div className="wrap">
        <h2>Page Not Found</h2>
        <p>
          Sorry! We couldn't find the page you're looking for. Return to{" "}
          <Link to="/">Homepage Page</Link>
        </p>
      </div>
    </main>
  );
};

export default NotFound;
