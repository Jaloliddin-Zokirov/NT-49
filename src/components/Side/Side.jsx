import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const Side = () => {
  return (
    <>
      <Header />
      <main>{<Outlet />}</main>
      <Footer />
    </>
  );
};

export default Side;
