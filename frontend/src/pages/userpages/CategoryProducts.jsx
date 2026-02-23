import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetProductsByCategorySlugQuery } from "../../redux/ApiSlices/categoryApiSlice";
import ProductCard from "../../components/ProductCard";
const CategoryProducts = () => {

  const { slug } = useParams();
  const { data, isLoading, isError, error, refetch } = useGetProductsByCategorySlugQuery(slug);
  const category = data?.category;
  const products = data?.products || [];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            {category?.slug || slug}
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900">
            {category?.name || "Category"}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {category?.description || "Browse products in this category."}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/categories"
            className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            All categories
          </Link>
          <button
            onClick={refetch}
            className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            Refresh
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center text-sm text-slate-500">
          Loading products...
        </div>
      )}

      {isError && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700">
          <div className="font-semibold">Unable to load products</div>
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
        <div>
          <div className="mb-4 text-sm text-slate-500">
            {products.length} product{products.length === 1 ? "" : "s"}
          </div>
          {products.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
              No products found in this category.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product._id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                product={product}/>
                
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;
