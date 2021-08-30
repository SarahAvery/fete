import React, { useState } from "react";
import Button from "../Button";

import "../Login-Signup/Forms.scss";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { authManager, isLoggedIn } from "../../utils/authUtils";

const Signup = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const isAuthed = isLoggedIn();

  async function registerUser({ email, password }) {
    authManager
      .tryUserRegistration(email, password)
      .then((data) => {})
      .catch((err) => {
        console.log("Error in Register API call: ", err);
      });
  }

  return (
    <div className="signup-container wrapper">
      <h2>Signup</h2>
      {isAuthed ? (
        <Redirect to="/dashboard" />
      ) : (
        <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <div>
              <label htmlFor="email">email:</label>
              <input
                type="email"
                name="email"
                placeholder="email@email.com"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <p id="error-msg">
                <span className="error">This email is already registered. Please login.</span>
              </p>
            </div>
            <div>
              <label htmlFor="password">password: </label>
              <input type="password" name="password" required />
            </div>
            <div>
              <label htmlFor="confirm-password">confirm password: </label>
              <input type="password" name="confirm-password" required onChange={(e) => setPassword(e.target.value)} />
              <p id="error-msg">
                <span className="error">Password does not match</span>
              </p>
            </div>
            <div className="btn-container">
              {<Button onClick={() => registerUser({ email, password })}>Register</Button>}
              {/* <button type="submit">sign up</button> */}
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

Signup.propTypes = {};

export default Signup;
