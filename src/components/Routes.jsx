import React from "react";
import { Route, Switch } from "react-router-dom";
import "./Application.scss";
import Login from "./Login-Signup/Login";
import Signup from "./Login-Signup/Signup";
import Dashboard from "./Dashboard/Dashboard";
import EventBoard from "./Event-Board/EventBoard";
import Preferences from "./Preferences/Preferences";
import ProtectedRoute from "./ProtectedRoute";
import CoreRoute from "./CoreRoute";

export const RouteList = {
  dashboard: "/dashboard",
  signup: "/signup",
  home: "/",
  login: "/login",
  board: "/board",
  preferences: "/preferences",
};

export default (
  <Switch>
    <CoreRoute exact={true} path={RouteList.home} />
    <CoreRoute path={RouteList.signup} component={Signup} />
    <CoreRoute path={RouteList.login} component={Login} />

    {/* Protected Routes */}
    <ProtectedRoute path={RouteList.board} component={EventBoard} />
    <ProtectedRoute path={RouteList.dashboard} component={Dashboard} />
    <ProtectedRoute path={RouteList.preferences} component={Preferences} />

    {/* <Route exact path="/logout">
      {() => authManager.logout() && <Redirect to="/" />}
    </Route> */}

    <Route path="*">
      <h3>404 not found</h3>
      {/* can call error component */}
    </Route>
  </Switch>
);
