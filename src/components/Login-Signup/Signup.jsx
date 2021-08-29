import React, { useState } from "react";
import Button from "../Button";

import "../Login-Signup/Forms.scss";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { Link } from "react-router-dom";

const Signup = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const { isAuthed, setToken } = props

  async function registerUser(credentials) {
    return fetch("http://localhost:8002/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else if (res.status === 403) {
          return res.json();
        } else {
          throw Error(res.statusText);
        }
      })
      .then((data) => {
        localStorage.setItem("token", data.accessToken);
        console.log("loginResponse", `localStorage set with token value: ${data.accessToken}`);
        setToken(data.accessToken)
      });
  }

  return (
    <div className="signup-container wrapper">
      <h2>Signup</h2>
      { isAuthed ? <Redirect to="/" /> : 
      <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <div>
            <label for="email">email:</label>
            <input
              type="text"
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
            <label for="password">password: </label>
            <input type="password" name="password" required />
          </div>
          <div>
            <label for="confirm-password">confirm password: </label>
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
      }
    </div>
  );
};

Signup.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Signup;
