import React, { Fragment } from "react";
import { Router } from "react-router-dom";
import "./Application.scss";
import { createBrowserHistory } from "history";
import { withUser } from "../contexts/UserContext";
import RouterRoot from "./RouterRoot";
import routes from "./Routes";

export const history = createBrowserHistory();

const Application = (props) => {
  return (
    <Fragment>
      <Router history={history}>
        <RouterRoot>{routes}</RouterRoot>
      </Router>
    </Fragment>
  );
};

export default withUser(Application);
