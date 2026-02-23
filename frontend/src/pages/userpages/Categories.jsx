import React from "react";
import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "../../redux/ApiSlices/categoryApiSlice";

const Categories = () => {
  const { data, isLoading, isError, error, refetch } = useGetCategoriesQuery();
  const categories = data?.categories || [];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">All categories</h1>
          <p className="mt-1 text-sm text-slate-500">Browse by category to find products faster.</p>
        </div>
        <button
          onClick={refetch}
          className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          Refresh
        </button>
      </div>

      {isLoading && (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center text-sm text-slate-500">
          Loading categories...
        </div>
      )}

      {isError && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700">
          <div className="font-semibold">Unable to load categories</div>
          <p className="mt-1">{error?.data?.message || "Something went wrong."}</p>
          <button
            onClick={refetch}
            className="mt-4 inline-flex items-center rounded-full border border-rose-200 bg-white px-4 py-2 text-sm font-semibold text-rose-700 shadow-sm transition hover:bg-rose-100"
          >
            Retry
          </button>
        </div>
      )}

      {!isLoading && !isError && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category._id}
              to={`/category/${category.slug}`}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="h-40 w-full overflow-hidden bg-slate-100">
                {category.image ? (
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
                    No image
                  </div>
                )}
              </div>
              <div className="p-5">
                <div className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  {category.slug}
                </div>
                <h2 className="mt-2 text-lg font-semibold text-slate-900">{category.name}</h2>
                <p className="mt-2 text-sm text-slate-600">
                  {category.description || "Explore the latest products in this category."}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
