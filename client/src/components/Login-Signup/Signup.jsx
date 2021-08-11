import React, { Fragment } from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { Link } from "react-router-dom";
// import PropTypes from "prop-types";

const Signup = (props) => {
  return (
    <div>
      <h2>Signup</h2>
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

export default Signup;
