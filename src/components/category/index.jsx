import React, { useEffect, useState } from "react";
import cx from "classnames";

const Category = ({ click, selected, category }) => {
  const handleClick = () => {
    if (selected) click(null);
    else click(category);
  };

  const classes = cx(
    "p-4 rounded-md shadow-sm text-base font-medium inline-flex items-center justify-center cursor-pointer",
    selected ? "bg-slate-900 text-white" : "bg-white text-slate-900"
  );

  return (
    <div onClick={handleClick} className={classes} key={category._id}>
      {category.nom}
    </div>
  );
};

export default Category;
