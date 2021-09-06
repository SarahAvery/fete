import React, { useState } from "react";
import Button from "../Button";
import { Redirect } from "react-router-dom";
import { authManager, isLoggedIn } from "../../utils/authUtils";
import { useUser } from "../../contexts/UserContext";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);
  const { setUser } = useUser();
  const isAuthed = isLoggedIn();

  async function loginUser({ email, password }) {
    authManager
      .tryUserLogin(email, password)
      .then((data) => {
        if (!data.accessToken) {
          setError(data);
        }
        setUser(data);
      })
      .catch((err) => {
        console.log("Error in Login API call: ", err);
      });
  }

  return (
    <div className="login-container wrapper">
      <h2>Login</h2>
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
              {error.email && <span className="error">This email was not found. Please signup.</span>}
            </div>
            <div>
              <label htmlFor="password">password: </label>
              <input type="password" name="password" required onChange={(e) => setPassword(e.target.value)} />
              {error.authenticated && <span className="error">Incorrect password</span>}
            </div>
            <div className="btn-container">{<Button onClick={() => loginUser({ email, password })}>Login</Button>}</div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;
