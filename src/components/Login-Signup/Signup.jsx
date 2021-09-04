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
  const [emailError, setEmailError] = useState(false);
  const { setUser } = useUser();
  const isAuthed = isLoggedIn();

  const checkPasswordsMatch = (pass1 = password, pass2 = passConfirm) => {
    return pass1 === pass2 ? true : false;
  };

  async function registerUser({ email, password }) {
    const passMatch = checkPasswordsMatch();
    if (passMatch) {
      authManager
        .tryUserRegistration(email, password)
        .then((data) => {
          console.log('data: ', data)
          if (data.authenticated) {
            // email exists but password doesn't match
            setEmailError(true)
            return
          }
          setUser(data);
          history.push(RouteList.dashboard);
        })
        .catch((err) => console.log("Error in Register API call: ", err));
    } else {
      setPassError(true);
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
            { emailError && <span className="error">This email is already registered. Please login.</span>}
            <div>
              <label htmlFor="password">password: </label>
              <input 
                type="password" 
                name="password" 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            <div>
              <label htmlFor="confirm-password">confirm password: </label>
              <input
                type="password"
                name="confirm-password"
                required
                onChange={(e) => setPassConfirm(e.target.value)}
              />
              {passError && <span className="error">Password does not match</span>}
            </div>
            <div className="btn-container">
              {<Button 
                onClick={() => registerUser({ email, password })}>
                Register
                </Button>}
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

Signup.propTypes = {};

export default Signup;
