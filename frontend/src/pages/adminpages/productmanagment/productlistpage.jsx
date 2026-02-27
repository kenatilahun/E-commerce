import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../../redux/ApiSlices/productApiSlice";

const ProductsPage = () => {
  const [search, setSearch] = useState("");
  const [deletingProductId, setDeletingProductId] = useState(null);

  const { data, isLoading, isError, error, refetch } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();

  const products = data?.products || [];

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  const stats = useMemo(() => {
    const total = products.length;
    const inStock = products.filter((p) => (p.countInStock ?? 0) > 0).length;
    const outOfStock = total - inStock;
    const categories = new Set(products.map((p) => p.category).filter(Boolean)).size;
    return { total, inStock, outOfStock, categories };
  }, [products]);

  const formatPrice = (value) => {
    if (value === null || value === undefined || value === "") return "-";
    const numberValue = Number(value);
    if (Number.isNaN(numberValue)) return value;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(numberValue);
  };

  const handleDeleteProduct = async (product) => {
    const confirmed = window.confirm(
      `Delete "${product.name}"? This action cannot be undone.`
    );
    if (!confirmed) return;

    try {
      setDeletingProductId(product._id);
      await deleteProduct(product._id).unwrap();
    } catch (err) {
      alert(err?.data?.message || "Failed to delete product");
    } finally {
      setDeletingProductId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Products</h2>
          <p className="mt-1 text-sm text-slate-500">Manage your catalog, pricing, and availability.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={refetch}
            className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            Refresh
          </button>
          <Link
            to="/admin/products/new"
            className="inline-flex items-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            + Add Product
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total products", value: stats.total },
          { label: "In stock", value: stats.inStock },
          { label: "Out of stock", value: stats.outOfStock },
          { label: "Categories", value: stats.categories },
        ].map((item) => (
          <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{item.label}</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <div className="text-sm font-medium text-slate-700">Search</div>
          <input
            type="text"
            placeholder="Search by product name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-800 shadow-sm transition focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 sm:w-80"
          />
        </div>
        <div className="text-sm text-slate-500">
          Showing <span className="font-semibold text-slate-700">{filteredProducts.length}</span> of{" "}
          <span className="font-semibold text-slate-700">{products.length}</span>
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
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {filteredProducts.length === 0 ? (
            <div className="p-10 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                ?
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">No products found</h3>
              <p className="mt-2 text-sm text-slate-500">Try a different search term or add a new product.</p>
              <Link
                to="/admin/products/new"
                className="mt-4 inline-flex items-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
              >
                Add Product
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">ID</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Product</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Category</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Price</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Stock</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredProducts.map((product) => {
                    const stock = product.countInStock ?? 0;
                    return (
                      <tr key={product._id} className="hover:bg-slate-50">
                        <td className="px-4 py-4 text-sm font-medium text-slate-500">
                          {product._id?.slice(-6)}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-12 w-12 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                              {product.image ? (
                                <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">No image</div>
                              )}
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-slate-900">{product.name}</div>
                              <div className="text-xs text-slate-500">SKU {product._id?.slice(-8)}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-slate-600">
                          {product.category?.name || product.category || "-"}
                        </td>
                        <td className="px-4 py-4 text-sm font-semibold text-slate-900">{formatPrice(product.price)}</td>
                        <td className="px-4 py-4 text-sm">
                          <span
                            className={[
                              "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
                              stock > 0 ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700",
                            ].join(" ")}
                          >
                            {stock > 0 ? `${stock} in stock` : "Out of stock"}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm">
                          <div className="flex flex-wrap items-center gap-2">
                            <button className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteProduct(product)}
                              disabled={deletingProductId === product._id}
                              className="rounded-full border border-rose-200 bg-white px-3 py-1.5 text-xs font-semibold text-rose-700 shadow-sm transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-70"
                            >
                              {deletingProductId === product._id ? "Deleting..." : "Delete"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
