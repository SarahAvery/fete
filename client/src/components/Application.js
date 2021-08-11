import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Header from "../components/Header/Header";
import "./Application.scss";
import Header from "./Header/Header";
import Login from "./Login-Signup/Login";
import Signup from "./Login-Signup/Signup";

// const Nav = (props) => {
//   return <nav className="sidebar__menu">{props.children}</nav>;
// };
// const Hr = () => <hr className="sidebar__separator sidebar--centered" />;
// const Image = (props) => <img className={props.className} src={props.src} alt={props.alt} />;
// const Section = (props) => <section className={props.className}>{props.children}</section>;

export default function Application(props) {
  return (
    <Fragment>
      <Router>
        <Header />

        <main className="layout">
          <Switch>
            <Route exact path="/">
              {/* <Home /> */}
            </Route>

            <Route exact path="/Signup" component={Signup}></Route>

            <Route exact path="/login" component={Login}></Route>
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
