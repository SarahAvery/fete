import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Header from "../components/Header/Header";
import "./Application.scss";
import Header from "./Header/Header";
import Login from "./Login-Signup/Login";
import Signup from "./Login-Signup/Signup";
import Dashboard from "../components/Dashboard/Dashboard";
import Preferences from "../components/Preferences/Preferences";

export default function Application(props) {
  // const [token, setToken] = useState();

  // if (!token) {
  //   return <Login setToken={setToken} />;
  // }

  return (
    <Fragment>
      <Router>
        <Header />

        <main className="layout">
          <Switch>
            <Route exact path="/">
              {/* <Home /> */}
            </Route>

            <Route exact path="/signup" component={Signup}></Route>
            {/* render={<Signup />} */}
            {/* setToken={setToken} */}

            {/* <Route exact path="/login" render={(props) => (<Login (props) isAuthed={true}/>)} /> */}

            <Route exact path="/login" component={Login} />
            {/* render={<Login />} */}
            {/* setToken={setToken} */}

            <Route exact path="/dashboard">
              <Dashboard />
            </Route>
            <Route exact path="/preferences">
              <Preferences />
            </Route>
            {/* onLogin={login} */}

            {/* 
            <Route exact path="/superheros">
              <Superheros superheros={state.superheros} loading={state.loading} />
            </Route>

            <Route path="/superheros/:id">
              <SuperheroPage superheros={state.superheros} />
            </Route> */}

            <Route path="*">
              <h3>404 not found</h3>
              {/* can call error component */}
            </Route>
          </Switch>
        </main>
        <footer></footer>
      </Router>
    </Fragment>
  );
}
