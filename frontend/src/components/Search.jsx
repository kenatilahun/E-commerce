import { useState } from "react";
import { useGetProductsQuery } from "../redux/ApiSlices/productApiSlice";

function formatPrice(value) {
  if (value === null || value === undefined) return "";
  const numberValue = Number(value);
  if (!Number.isFinite(numberValue)) return String(value);
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(numberValue);
  } catch {
    return String(value);
  }
}

function Search() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");

  const {
    data: products = [],
    isFetching,
    isError,
    error,
    isSuccess,
  } = useGetProductsQuery(
    { keyword: submittedQuery, pageNumber: 1 },
    { skip: !submittedQuery }
  );

  const fetchProducts = (event) => {
    if (event?.preventDefault) event.preventDefault();
    setSubmittedQuery(query.trim());
  };

  const isLoading = isFetching;
  const hasResults = products.length > 0;
  const showEmpty = isSuccess && !hasResults;
  const isDisabled = isLoading || !query.trim();
  const errorMessage =
    error?.data?.message || error?.error || "Search failed. Please try again.";

  return (
    <div className="flex w-full flex-col sm:flex-row sm:items-start sm:gap-2">
      <form
        onSubmit={fetchProducts}
        className="flex w-full flex-col sm:flex-row sm:items-center sm:gap-2"
        role="search"
      >
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search products"
          aria-label="Search products"
          className="w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-800 shadow-sm transition focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
        />
        <button
          type="submit"
          disabled={isDisabled}
          aria-busy={isLoading}
          className="mt-2 inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400 sm:mt-0 sm:ml-2"
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>

      <div className="mt-3 w-full" aria-live="polite">
        {isError && <p className="text-sm text-rose-600">{errorMessage}</p>}
        {showEmpty && (
          <p className="text-sm text-slate-500">No products found.</p>
        )}
        {hasResults && (
          <ul className="space-y-2">
            {products.map((item, index) => {
              const key = item?._id || item?.id || `${item?.name || "item"}-${index}`;
              return (
                <li
                  key={key}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm"
                >
                  <div className="font-semibold text-slate-900">
                    {item?.name || "Unnamed product"}
                  </div>
                  {item?.price !== undefined && (
                    <div className="text-slate-600">{formatPrice(item.price)}</div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Search;
