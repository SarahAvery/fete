import React, { useState } from "react";
import Button from "../Button";
import Header from "../Header/Header";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// This will need to become a useEffect hook
async function loginUser(credentials) {
  return fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

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
      <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
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
            {/* <Button onClick={() => validate()}></Button> */}
            <button type="submit">login</button>
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
