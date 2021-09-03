import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

const CoreLayout = ({ component: Component, props }) => {
  return (
    <>
      <Header />
      <main className="layout">{Component && <Component {...props} />}</main>
      <Footer />
    </>
  );
};

export default CoreLayout;
