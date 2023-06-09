import React from "react";

const Error = ({ error, touched }) => (
  <div
    className={`text-red-600 ml-2 text-sm dark:text-red-500 ${
      !error || touched ? "visible translate-y-2 " : "hidden translate-y-0"
    } ease-in duration-500`}
  >
    {error}
  </div>
);

export default Error;
