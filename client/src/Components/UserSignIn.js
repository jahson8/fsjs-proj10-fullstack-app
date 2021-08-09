//* React and React Router imports
import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserSignIn = () => {
  //* State variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // event handler
  const handleValueChange = (evt) => {
    const target = evt.target;
    const name = target.name;
    const value = target.value;
    name === "emailAddress" ? setEmail(value) : setPassword(value);
  };

  return (
    <main>
      <div className="form--centered">
        <h2>Sign In</h2>

        <form>
          <label htmlFor="emailAddress">Email Address</label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            onChange={handleValueChange}
            value={email}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={handleValueChange}
          />
          <button className="button" type="submit">
            Sign In
          </button>
          <button
            className="button button-secondary"
            // onclick="event.preventDefault(); location.href='index.html';"
          >
            Cancel
          </button>
        </form>
        <p>
          Don't have a user account? Click here to{" "}
          <Link to="/signup">sign up</Link>!
        </p>
      </div>
    </main>
  );
};

export default UserSignIn;
