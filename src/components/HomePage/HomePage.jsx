import React from "react";
import { isLoggedIn } from "../../utils/authUtils";
import { Redirect } from "react-router-dom";
import { RouteList } from "../Routes";
import "./HomePage.scss";
import imgPaint from "../../assets/paint.jpg";
import imgWave from "../../assets/wave.jpg";

const HomePage = () => {
  const isAuthed = isLoggedIn();

  return (
    <>
      {isAuthed && <Redirect to={RouteList.dashboard} />}
      <div className="HomePage ">
        <div className="wrapper">
          <div className="banner">
            <div>
              <h1 className="title">All of your planning in one place!</h1>
            </div>
            <div>
              <h2 className="subtitle">
                Manage projects for the big day - all on <em>Fete</em>
              </h2>
            </div>
          </div>

          <div className="home-container">
            <section>
              <div className="image-container">
                <img src={imgWave} alt="" />
              </div>
              <div className="para-container">
                <p className="para"> See all your current events in one place</p>
              </div>
            </section>

            <section>
              <div className="para-container">
                <p className="para">Keep track of all the steps leading up to the big day</p>
              </div>
              <div className="image-container">
                <img src={imgPaint} alt="" />
              </div>
            </section>

            <section className="pitch">
              <div className="account">
                <p className="subtitle free">Best of all, it's free!</p>
                <p className="para create">Create your own account, where you can have one event at a time for free!</p>
              </div>
              <div className="membership">
                <p className="subtitle">
                  Need to handle more events? <em>No problem!</em>
                </p>
                <p className="para more">
                  You can have as many events as you need when you signup with our premium membership!
                </p>
                <p className="para more">
                  Checkout our membership prices
                  <em> here</em>!
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
