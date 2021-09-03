import React from "react";
import { Route, Switch } from "react-router-dom";
import "./Application.scss";

import Login from "./Login-Signup/Login";
import Signup from "./Login-Signup/Signup";
import Dashboard from "./Dashboard/Dashboard";
import EventBoard from "./Event-Board/EventBoard";
import NewEvent from "./Dashboard/NewEvent";
import ProtectedRoute from "./ProtectedRoute";
import CoreRoute from "./CoreRoute";
import HomePage from "./HomePage/HomePage";

export const RouteList = {
  dashboard: "/dashboard",
  signup: "/signup",
  home: "/",
  login: "/login",
  board: "/board",
  newevent: "/newevent",
};

export default (
  <Switch>
    <CoreRoute exact={true} path={RouteList.home} component={HomePage} />
    <CoreRoute path={RouteList.signup} component={Signup} />
    <CoreRoute path={RouteList.login} component={Login} />

    {/* Protected Routes */}
    <ProtectedRoute path={RouteList.board} component={EventBoard} />
    <ProtectedRoute path={RouteList.dashboard} component={Dashboard} />
    <ProtectedRoute path={RouteList.newevent} component={NewEvent} />

    <Route path="*">
      <h3>404 not found</h3>
    </Route>
  </Switch>
);
