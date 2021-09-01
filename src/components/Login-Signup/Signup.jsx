import React, { useState } from "react";
import Button from "../Button";

import "../Login-Signup/Forms.scss";
// import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { authManager, isLoggedIn } from "../../utils/authUtils";
import { history } from "../Application";
import { RouteList } from "../Routes";
import { useUser } from "../../contexts/UserContext";

const Signup = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passConfirm, setPassConfirm] = useState();
  const [passError, setPassError] = useState();
  const { setUser } = useUser();
  const isAuthed = isLoggedIn();

  const checkPasswordsMatch = (pass1 = password, pass2 = passConfirm) => {
    return pass1 === pass2 ? true : false
  };

  async function registerUser({ email, password }) {
    const passMatch = checkPasswordsMatch()
    if (passMatch) {
      authManager
      .tryUserRegistration(email, password)
      .then((data) => {
        setUser(data);
        history.push(RouteList.dashboard);
        console.log("Data in API call: ", data);
      })
      .catch((err) => {
        console.log("Error in Register API call: ", err);
      });
    } else {
      setPassError(true)
    }
  }

  return (
    <div className="signup-container wrapper">
      <h2>Signup</h2>
      {isAuthed ? (
        <Redirect to={RouteList.dashboard} />
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
            </div>
            <span className="error">This email is already registered. Please login.</span>
            <div>
              <label htmlFor="password">password: </label>
              <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="confirm-password">confirm password: </label>
              <input type="password" name="confirm-password" required onChange={(e) => setPassConfirm(e.target.value)} />
              {/* <p id="error-msg"> */}
                { passError && <span className="error">Password does not match</span> }
              {/* </p> */}
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
