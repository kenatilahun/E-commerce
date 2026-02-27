import React from "react";
import ProductCard from "../ProductCard";

const FeaturedProducts = ({
  title,
  description,
  products = [],
  isLoading,
  isError,
  error,
  onRetry,
}) => {
  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Featured products</p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-slate-900">{title}</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            {description || "Handpicked items with the highest rating from customers this week."}
          </p>
        </div>
        <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm">
          Updated weekly
        </div>
      </div>

      {isLoading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="h-56 rounded-2xl border border-dashed border-slate-200 bg-slate-50"
            />
          ))}
        </div>
      )}

      {isError && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700">
          <div className="font-semibold">Unable to load products</div>
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
          {products.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-sm text-slate-500">
              No products to display yet. Add products in the admin panel to highlight them here.
            </div>
          ) : (
            products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                className="border-amber-100 shadow-sm hover:shadow-lg"
              />
            ))
          )}
        </div>
      )}
    </section>
  );
};

export default FeaturedProducts;
