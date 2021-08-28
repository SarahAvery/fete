import React, { useState } from "react";
import Button from "../Button";
import Header from "../Header/Header";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// const jwt = require('jsonwebtoken')

// This will need to become a useEffect hook
async function loginUser(credentials) {
  return fetch("http://localhost:8002/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        throw Error(res.statusText);
      }
    })
    .then((data) => {
      localStorage.setItem("token", data.accessToken);
      console.log("loginResponse", `localStorage set with token value: ${data.accessToken}`);
    });
}

/*
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, tokenData) => {
    if (err) return res.sendStatus(403)
    req.user = tokenData
    next()
  })
}
*/

const Login = ({ setToken }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  // const handleSubmit = async e => {
  //   e.preventDefault();
  //   const token = await loginUser({
  //     email,
  //     password
  //   });
  //   setToken(token);
  // }

  return (
    <div className="login-container wrapper">
      <h2>Login</h2>
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
              <span className="error">This email was not found. Please signup.</span>
            </p>
          </div>
          <div>
            <label for="password">password: </label>
            <input type="password" name="password" required onChange={(e) => setPassword(e.target.value)} />
            <p id="error-msg">
              <span className="error">Incorrect password</span>
            </p>
          </div>
          <div className="btn-container">
            {<Button onClick={() => loginUser({ email, password })}>Login</Button>}
            {/* <button type="submit">login</button> */}
          </div>
        </div>
      </form>
    </div>
  );
};

Login.propTypes = {
  // onLogin: PropTypes.func,
  setToken: PropTypes.func.isRequired,
};

export default Login;
