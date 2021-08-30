import React from "react";
import { Redirect } from "react-router-dom";
import "./Application.scss";
import { isLoggedIn } from "../utils/authUtils";
import { RouteList } from "./Routes";
import CoreRoute from "./CoreRoute";

const ProtectedRoute = ({ path, component }) => {
  const isAuthenticated = isLoggedIn();

  return isAuthenticated ? <CoreRoute path={path} component={component} /> : <Redirect to={RouteList.login} />;
};

export default ProtectedRoute;
