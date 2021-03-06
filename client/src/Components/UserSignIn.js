//* React and React Router imports
import React, { useState, useContext } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Context } from "../Context";

//* Component Imports
import ErrorDisplay from "./ErrorDisplay";

const UserSignIn = () => {
  //* State variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  //* React Router Hooks and variables
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  //* import context functions
  const { actions } = useContext(Context);

  //* updates state when input value changes
  const handleValueChange = (evt) => {
    const target = evt.target;
    const name = target.name;
    const value = target.value;
    name === "emailAddress" ? setEmail(value) : setPassword(value);
  };

  //*  adds signin functionality
  const handleSignIn = () => {
    actions
      .signIn(email, password)
      .then((user) => {
        if (user === null) {
          setErrors(["Sign-in was unsuccessful"]);
        } else {
          history.push(from);
          console.log(`SUCCESS! ${email} is now signed in!`);
        }
      })
      .catch((err) => {
        console.log(err);
        history.push("/error");
      });
  };

  return (
    <main>
      <div className="form--centered">
        <h2>Sign In</h2>
        {errors.length ? <ErrorDisplay errors={errors} /> : null}
        <form
          onSubmit={(evt) => {
            evt.preventDefault();
            handleSignIn();
          }}
        >
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
            onClick={() => history.push("/")}
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
