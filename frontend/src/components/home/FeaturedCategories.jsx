import React from "react";
import { Link } from "react-router-dom";
import AllCategoriesButton from "../Categories/AllCategoriesButton";

const FeaturedCategories = ({
  title,
  subtitle,
  categories = [],
  isLoading,
  isError,
  error,
  onRetry,
}) => {
  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-amber-600">Featured categories</p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-slate-900">{title}</h2>
          {subtitle && <p className="mt-2 max-w-2xl text-sm text-slate-500">{subtitle}</p>}
        </div>
        <AllCategoriesButton />
      </div>

      {isLoading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-44 rounded-3xl border border-dashed border-amber-100 bg-amber-50/40"
            />
          ))}
        </div>
      )}

      {isError && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700">
          <div className="font-semibold">Unable to load categories</div>
          <p className="mt-1">{error?.data?.message || "Something went wrong."}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-4 inline-flex items-center rounded-full border border-rose-200 bg-white px-4 py-2 text-sm font-semibold text-rose-700 shadow-sm transition hover:bg-rose-100"
            >
              Retry
            </button>
          )}
        </div>
      )}

      {!isLoading && !isError && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-sm text-slate-500">
              No categories yet. Add some from the admin panel to showcase them here.
            </div>
          ) : (
            categories.map((category) => (
              <Link
                key={category._id}
                to={`/category/${category.slug}`}
                className="group relative overflow-hidden rounded-3xl border border-amber-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="h-40 w-full overflow-hidden bg-amber-50">
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-slate-400">
                      No image
                    </div>
                  )}
                </div>
                <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-600 shadow">
                  Trending
                </div>
                <div className="border-t border-amber-100 p-4">
                  <h3 className="text-lg font-semibold text-slate-900">{category.name}</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {category.description || "Explore new arrivals and best sellers."}
                  </p>
                  <div className="mt-3 inline-flex items-center text-xs font-semibold text-slate-900">
                    Shop now →
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </section>
  );
};

export default FeaturedCategories;
