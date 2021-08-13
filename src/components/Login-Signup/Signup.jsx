import React from "react";
import "../Login-Signup/Forms.scss";

// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { Link } from "react-router-dom";
// import PropTypes from "prop-types";

const Signup = (props) => {
  return (
    <div className="signup-container wrapper">
      <h2>Signup</h2>
      <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
        <div className="form-group">
          <div>
            <label for="email">email:</label>
            <input type="text" name="email" placeholder="email@email.com" required />
            <p id="error-msg">
              <span className="error">This email is already registered. Please login.</span>
            </p>
          </div>
          <div>
            <label for="password">password: </label>
            <input type="password" name="password" required />
          </div>
          <div>
            <label for="confirm-password">confirm password: </label>
            <input type="password" name="confirm-password" required />
            <p id="error-msg">
              <span className="error">Password does not match</span>
            </p>
          </div>
          <div className="btn-container">
            <button type="submit">sign up</button>
          </div>
        </div>
      </form>
    </div>
  );
};

// day-list__item--full

// Signup.propTypes = {};

export default Signup;
