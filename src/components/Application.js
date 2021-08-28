import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Header from "../components/Header/Header";
import "./Application.scss";
import Header from "./Header/Header";
import Login from "./Login-Signup/Login";
import Signup from "./Login-Signup/Signup";
import Dashboard from "../components/Dashboard/Dashboard";
import Preferences from "../components/Preferences/Preferences";
import useToken from '../hooks/useToken';



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



export default function Application(props) {
  // const [token, setToken] = useState();
  // const token = getToken();

  const { token, setToken } = useToken();

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
              <Dashboard events={events} />
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
