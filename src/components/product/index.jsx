import React from "react";

const ProductCard = ({ nom, slug, stok, categorie, click }) => {
  return (
    <div
      onClick={click}
      className="w-full bg-white rounded-md text-slate-900 cursor-pointer p-4 shadow-md"
    >
      {`${nom}: ${stok}`}
    </div>
  );
};

export default ProductCard;
