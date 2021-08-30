import React, { useState, render, useEffect } from "react";
import Button from "../Button";
import Header from "../Header/Header";
import Application from "../Application";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";


const Login = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);
  
  const { isAuthed, setToken } = props
  
  // console.log('props: ', props)
  // console.log('isAuthed: ', isAuthed)

  async function loginUser(credentials) {
    fetch("http://localhost:8002/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else if (res.status === 404) {
          return { email: true }
        } else if (res.status === 403) {
          return { authentication: true }
        } else {
          throw Error(res.statusText);
        }
      })
      .then(data => {
        if (data.accessToken) {
          localStorage.setItem("token", data.accessToken);
          // console.log("loginResponse", `localStorage set with token value: ${data.accessToken}`);
          setToken(data.accessToken)
        } else {
          console.log('Data in API call: ', data)
          setError(data)
        }
      })
      .catch((err) => {console.log('Error in Login API call: ', err)})
  }

  console.log('error State: ', error)

  return (
    <div className="login-container wrapper">
      <h2>Login</h2>
      { isAuthed ? <Redirect to="/dashboard" /> : 
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
            {/* <p id="error-msg"> */}
            { error.email && <span className="error">This email was not found. Please signup.</span> }
            {/* </p> */}
          </div>
          <div>
            <label for="password">password: </label>
            <input type="password" name="password" required onChange={(e) => setPassword(e.target.value)} />
            {/* <p id="error-msg"> */}
              { error.authentication && <span className="error">Incorrect password</span> }
            {/* </p> */}
          </div>
          <div className="btn-container">
            {<Button onClick={() => loginUser({ email, password })}>Login</Button>}
            {/* <button type="submit">login</button> */}
          </div>
        </div>
      </form>
      }
    </div>
  );
};

Login.propTypes = {
  // onLogin: PropTypes.func,
  setToken: PropTypes.func.isRequired,
};

export default Login;
