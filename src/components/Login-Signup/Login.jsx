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

  console.log("error State: ", error);

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
              {/* <p id="error-msg"> */}
              {error.email && <span className="error">This email was not found. Please signup.</span>}
              {/* </p> */}
            </div>
            <div>
              <label htmlFor="password">password: </label>
              <input type="password" name="password" required onChange={(e) => setPassword(e.target.value)} />
              {/* <p id="error-msg"> */}
              {error.authenticated && <span className="error">Incorrect password</span>}
              {/* </p> */}
            </div>
            <div className="btn-container">
              {<Button onClick={() => loginUser({ email, password })}>Login</Button>}
              {/* <button type="submit">login</button> */}
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

Login.propTypes = {
  // onLogin: PropTypes.func,
};

export default Login;
