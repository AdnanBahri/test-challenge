import React from "react";
import { Link } from "react-router-dom";

const HomeScreen = () => {
  return (
    <div className="max-w-screen-xl min-h-screen flex flex-col justify-center items-center mx-auto py-20 px-4">
      <div className="text-2xl font-bold text-slate-900">Welcome</div>
      <p className="text-base font-medium text-slate-800 underline">
        <Link to={"/clients"}>Manage Clients</Link>
      </p>
      <p className="text-base font-medium text-slate-800 underline">
        <Link to={"/products"}>Manage Products</Link>
      </p>
      <p className="text-base font-medium text-slate-800 underline">
        Manage Categories
      </p>
    </div>
  );
};

export default HomeScreen;
