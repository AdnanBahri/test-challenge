import React from "react";

const ClientCard = ({ nom, telephone, adresse, sousDomaine }) => {
  return (
    <div className="w-full bg-white rounded-md text-slate-900 cursor-pointer px-4 py-2 shadow-md">
      {`${nom}: ${sousDomaine}`}
    </div>
  );
};

export default ClientCard;
