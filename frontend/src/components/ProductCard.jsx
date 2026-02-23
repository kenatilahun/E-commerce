import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, className = "" }) => {
  return (
    <div className={`${className} overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg`}>
      <Link to={`/product/${product._id}`} className="block">
        <div className="h-40 w-full overflow-hidden bg-slate-100">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover transition duration-300 hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
              No image
            </div>
          )}
        </div>
      </Link>
      <div className="p-5">
        <h2 className="text-lg font-semibold text-slate-900">{product.name}</h2>
        <p className="mt-1 text-sm text-slate-500">{product.category?.name || product.category || ""}</p>
        <div className="mt-3 text-sm font-semibold text-slate-900">${product.price}</div>
      </div>
    </div>
  );
};

export default ProductCard;

