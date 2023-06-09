import React from "react";
import Navbar from "../components/navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="w-full h-full">{children}</div>
    </>
  );
};

export default Layout;
