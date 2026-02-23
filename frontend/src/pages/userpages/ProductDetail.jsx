import React from "react";
import { useParams, Link } from "react-router-dom";
import { useGetProductByIdQuery } from "../../redux/ApiSlices/productApiSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const { data: product, isLoading, isError, error, refetch } = useGetProductByIdQuery(id);

  if (isLoading) {
    return (
      <div className="p-8 text-center text-sm text-slate-500">Loading product...</div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-center text-sm text-rose-700">
        <div className="font-semibold">Unable to load product</div>
        <p className="mt-1">{error?.data?.message || error?.message || "Something went wrong."}</p>
        <button onClick={refetch} className="mt-4 inline-flex items-center rounded-full border border-rose-200 bg-white px-4 py-2 text-sm font-semibold text-rose-700 shadow-sm transition hover:bg-rose-100">Retry</button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-8 text-center text-sm text-slate-500">Product not found.</div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="col-span-1">
          <div className="h-72 w-full overflow-hidden rounded-2xl bg-slate-100">
            {product.image ? (
              <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">No image</div>
            )}
          </div>
        </div>

        <div className="col-span-2">
          <div className="mb-4 flex items-center gap-3">
            <Link to="/categories" className="text-sm text-slate-500 hover:underline">Categories</Link>
            <span className="text-sm text-slate-400">/</span>
            <Link to={`/category/${product.category?.slug || ""}`} className="text-sm font-medium text-slate-900 hover:underline">{product.category?.name || ""}</Link>
          </div>

          <h1 className="text-2xl font-semibold text-slate-900">{product.name}</h1>
          <div className="mt-3 text-lg font-semibold text-slate-900">${product.price}</div>

          <div className="mt-6 text-sm text-slate-700">
            {product.description || product.category?.description || "No description available."}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
