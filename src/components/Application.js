import React, { Fragment, useState, useEffect } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch, withRouter } from "react-router-dom";
// import Header from "../components/Header/Header";
import "./Application.scss";
import Header from "./Header/Header";
import Login from "./Login-Signup/Login";
import Signup from "./Login-Signup/Signup";
import Dashboard from "../components/Dashboard/Dashboard";
import EventBoard from "../components/Event-Board/EventBoard";
import Preferences from "../components/Preferences/Preferences";
import { createBrowserHistory } from "history";
import { authManager, isLoggedIn } from "../utils/authUtils";
import { withUser } from "../contexts/UserContext";
import RouterRoot from "./RouterRoot";

export const Routes = {
  dashboard: "/dashboard",
  signup: "/signup",
  home: "/",
  login: "/login",
  board: "/board",
  preferences: "/preferences",
};

export const history = createBrowserHistory();

// Dashboard
const events = [
  {
    id: 1,
    title: "Sam and Janine's Wedding",
    first_name: "Sam Hutching",
    second_name: "Janine Deval",
    weekday: "Saturday",
    month: "July",
    day: 23,
    year: 2022,
    email: "samh@email.com",
    phone: 5559686412,
    unit: null,
    street_number: 1613,
    street_name: "New",
    type: "Rd",
    postal: "M4T 2T1",
    city: "Toronto",
    percent: 46,
  },
  {
    id: 2,
    title: "John and Dan's Wedding",
    first_name: "John Moore",
    second_name: "Dan Mathers",
    weekday: "Friday",
    month: "December",
    day: 13,
    year: 2021,
    email: "danm@email.com",
    phone: 9045555555,
    unit: 5,
    street_number: 253,
    street_name: "lakeshore",
    type: "Dr",
    postal: "L7T 4R5",
    city: "Orillia",
    percent: 76,
  },
];

const ProtectedRoute = ({ path, component }) => {
  const isAuthenticated = isLoggedIn();

  return isAuthenticated ? <Route exact path={Routes.board} component={EventBoard} /> : <Redirect to={Routes.login} />;
};

const Application = (props) => {
  return (
    <Fragment>
      <Router history={history}>
        <RouterRoot>
          <Header />
          <main className="layout">
            <Switch>
              <Route exact path={Routes.home} />
              <Route exact path={Routes.signup} component={Signup} />
              <Route exact path={Routes.login} component={Login} />

              {/* Protected Routes */}
              <ProtectedRoute path={Routes.board} component={EventBoard} />
              <Route exact path={Routes.dashboard}>
                <Dashboard events={events} />
              </Route>
              <Route exact path={Routes.preferences}>
                <Preferences />
              </Route>
              {/* onLogin={login} */}

              <Route exact path="/logout">
                {() => authManager.logout() && <Redirect to="/" />}
              </Route>

              <Route path="*">
                <h3>404 not found</h3>
                {/* can call error component */}
              </Route>
            </Switch>
          </main>
          <footer></footer>
        </RouterRoot>
      </Router>
    </Fragment>
  );
};

export default withUser(Application);
