import React, { Fragment } from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { Link } from "react-router-dom";
// import PropTypes from "prop-types";

const Login = (props) => {
  return (
    <div>
      <h2>Login</h2>
      <form>
        <label id="email" htmlFor="email">
          email:
        </label>
        <input type="email" name="email" />
      </form>
    </div>
  );
};

// Signup.propTypes = {};

export default Login;
