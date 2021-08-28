import React, { Fragment, useState, useEffect } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
// import Header from "../components/Header/Header";
import "./Application.scss";
import Header from "./Header/Header";
import Login from "./Login-Signup/Login";
import Signup from "./Login-Signup/Signup";
import Dashboard from "../components/Dashboard/Dashboard";
import EventBoard from "../components/Event-Board/EventBoard";
import Preferences from "../components/Preferences/Preferences";
import useToken from '../hooks/useToken';


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


// Events (Kanban)
const data = [
  {
    swim_id: 1,
    swim_title: "Open",
    items: [
      {
        item_id: 1,
        item_title: "flowers",
        item_content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae pariatur ex dicta adipisci illo.",
      },
      {
        item_id: 2,
        item_title: "dress",
        item_content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae pariatur ex dicta adipisci illo.",
      },
    ],
  },

  {
    swim_id: 2,
    swim_title: "in-progress",
    items: [
      {
        item_id: 3,
        item_title: "cake tasting",
        item_content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae pariatur ex dicta adipisci illo.",
      },
    ],
  },

  {
    swim_id: 3,
    swim_title: "feedback",
    items: [
      {
        item_id: 4,
        item_title: "seating chart",
        item_content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae pariatur ex dicta adipisci illo.",
      },
      {
        item_id: 5,
        item_title: "invitations",
        item_content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae pariatur ex dicta adipisci illo.",
      },
    ],
  },

  {
    swim_id: 4,
    swim_title: "complete",
    items: [
      {
        item_id: 6,
        item_title: "venue",
        item_content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae pariatur ex dicta adipisci illo.",
      },
    ],
  },
];


export default function Application(props) {
  // Could not get this system working. The authguard helper method is working for Dashboard though.
  // const [token, setToken] = useState();
  // const { token, setToken } = useToken();
  // if (!token) {
  //   return <Login setToken={setToken} />;
  // }

  const authGuard = (Component) => () => {
    return localStorage.getItem("token") ? (
      <Component />
    ) : (
      <Redirect to="/login" />
    )
  }

  const { token, setToken } = useToken();
  useEffect(() => {
    console.log('token in Application: ', token)
  },[token])



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

            {/* <Route exact path="/dashboard">
              <Dashboard events={events} />

            </Route> */}
            
            <Route exact path="/board">
              <EventBoard data={data} />
            </Route>


            <Route exact path="/preferences">
              <Preferences />
            </Route>
            {/* onLogin={login} */}

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
