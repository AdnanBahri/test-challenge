import React from "react";

const ClientCard = ({ nom, telephone, adresse, sousDomaine, click }) => {
  return (
    <div
      onClick={click}
      className="w-full bg-white rounded-md text-slate-900 cursor-pointer p-4 shadow-md"
    >
      {`${nom}: ${sousDomaine}`}
    </div>
  );
};

export default ClientCard;
