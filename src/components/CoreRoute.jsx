import React from "react";
import { useEffect } from "react";
import { Route } from "react-router-dom";
import "./Application.scss";
import CoreLayout from "./CoreLayout";

const CoreRoute = ({ path, component, exact = false }) => {
  useEffect(() => {
    // console.log(path);
  }, [path]);
  return <Route exact={exact} path={path} render={(props) => <CoreLayout {...props} component={component} />} />;
};

export default CoreRoute;
