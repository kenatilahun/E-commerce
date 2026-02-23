import React from "react";
import { Link } from "react-router-dom";

const AllCategoriesButton = () => {
  return (
    <Link
      to="/categories"
      className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
    >
      All categories
    </Link>
  );
};

export default AllCategoriesButton;
