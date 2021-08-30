import React from "react";
import Header from "./Header/Header";

const CoreLayout = ({ component: Component, props }) => {
  return (
    <>
      <Header />
      <main className="layout">{Component && <Component {...props} />}</main>
      <footer></footer>
    </>
  );
};

export default CoreLayout;
