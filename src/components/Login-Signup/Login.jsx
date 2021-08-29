import React, { useState } from "react";
import Button from "../Button";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { Routes } from "../../helpers/routes";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { setUser } = useUser();
  const history = useHistory();

  // This will need to become a useEffect hook
  const loginUser = (credentials) => {
    return fetch("http://localhost:8002/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw Error(res.statusText);
        }
      })
      .then((data) => {
        localStorage.setItem("token", data.accessToken);
        console.log("loginResponse", `localStorage set with token value: ${data.accessToken}`);
        setUser(data);
        // redirect
        history.push(Routes.dashboard);
      });
  };

  return (
    <div className="login-container wrapper">
      <h2>Login</h2>
      <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <div>
            <label htmlFor="email">email:</label>
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
            <label htmlFor="password">password: </label>
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
  // setToken: PropTypes.func.isRequired,
};

export default Login;
