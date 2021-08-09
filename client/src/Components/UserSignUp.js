//* React and React Router imports
import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../Context";

const UserSignUp = () => {
  // Get context
  const { data } = useContext(Context);
  const history = useHistory();

  //* State variables
  const [emailAddress, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [errors, setErrors] = useState([]);

  //* handles input values and updates state as form is filled
  const handleValueChange = (evt) => {
    const target = evt.target;
    const name = target.name;
    const value = target.value;

    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "emailAddress":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        setConfirmedPassword(value);
    }
  };

  // * Handle form submission
  const handleSubmit = () => {
    // New user payload
    const user = {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmedPassword,
    };

    data
      .createUser(user)
      .then((errors) => {
        if (errors.length) {
          setErrors(errors);
        } else {
          console.log(
            `${emailAddress} is successfully signed up and Authenticated!`
          );
        }
      })
      .catch((err) => {
        // handle rejected promises
        console.log(err);
        history.push("/error");
      });
  };

  return (
    <main>
      <div className="form--centered">
        <h2>Sign Up</h2>
        {errors.length ? (
          <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>
              {errors.map((err, index) => (
                <li key={index}>{err}</li>
              ))}
            </ul>
          </div>
        ) : null}
        <form
          onSubmit={(evt) => {
            evt.preventDefault();
            handleSubmit();
          }}
        >
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            onChange={handleValueChange}
            value={firstName}
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={lastName}
            onChange={handleValueChange}
          />
          <label htmlFor="emailAddress">Email Address</label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            onChange={handleValueChange}
            value={emailAddress}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={handleValueChange}
            value={password}
          />

          <label htmlFor="confirmedPassword">Confirm Password</label>
          <input
            id="confirmedPassword"
            name="confirmedPassword"
            type="password"
            onChange={handleValueChange}
            value={confirmedPassword}
          />
          <button className="button" type="submit">
            Sign Up
          </button>
          <button
            className="button button-secondary"
            onClick={() => history.push("/")}
          >
            Cancel
          </button>
        </form>
        <p>
          Already have a user account? Click here to{" "}
          <Link to="/signin">sign in</Link>!
        </p>
      </div>
    </main>
  );
};

export default UserSignUp;
