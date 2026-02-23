import React, { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductByIdQuery } from "../../redux/ApiSlices/productApiSlice";
import { useAddCartItemMutation } from "../../redux/ApiSlices/cartApiSlice";
import { addItem as addGuestItem } from "../../redux/featureSlices/cartSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const { data: product, isLoading, isError, error, refetch } = useGetProductByIdQuery(id);
  const [addCartItem, { isLoading: isAdding }] = useAddCartItemMutation();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [qty, setQty] = useState(1);
  const [selectedVariantId, setSelectedVariantId] = useState("");
  const [actionError, setActionError] = useState("");

  const variants = useMemo(() => product?.variants || [], [product]);
  const selectedVariant = useMemo(
    () => variants.find((variant) => String(variant._id) === String(selectedVariantId)),
    [variants, selectedVariantId]
  );

  const displayPrice = selectedVariant?.price ?? product?.price;

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

  const handleAddToCart = async () => {
    setActionError("");

    if (variants.length > 0 && !selectedVariantId) {
      setActionError("Please select a variant.");
      return;
    }

    if (userInfo) {
      try {
        await addCartItem({
          productId: product._id,
          qty,
          variantId: selectedVariantId || undefined,
        }).unwrap();
      } catch (err) {
        setActionError(err?.data?.message || "Unable to add to cart.");
      }
      return;
    }

    dispatch(
      addGuestItem({
        productId: product._id,
        name: product.name,
        image: product.image || "",
        price: displayPrice,
        qty,
        variantId: selectedVariantId || "",
        variantLabel: selectedVariant ? `${selectedVariant.name}: ${selectedVariant.value}` : "",
      })
    );
  };

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
          <div className="mt-3 text-lg font-semibold text-slate-900">${displayPrice}</div>

          <div className="mt-6 text-sm text-slate-700">
            {product.description || product.category?.description || "No description available."}
          </div>

          {variants.length > 0 && (
            <div className="mt-6">
              <label className="text-sm font-medium text-slate-700">Select variant</label>
              <select
                value={selectedVariantId}
                onChange={(e) => setSelectedVariantId(e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
              >
                <option value="">Choose an option</option>
                {variants.map((variant) => (
                  <option key={variant._id} value={variant._id}>
                    {variant.name}: {variant.value}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                className="h-10 w-10 rounded-full border border-slate-200 bg-white text-lg text-slate-700 shadow-sm"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={qty}
                onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
                className="h-10 w-16 rounded-xl border border-slate-200 bg-white text-center text-sm text-slate-800"
              />
              <button
                type="button"
                onClick={() => setQty((prev) => prev + 1)}
                className="h-10 w-10 rounded-full border border-slate-200 bg-white text-lg text-slate-700 shadow-sm"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isAdding}
              className="inline-flex items-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:opacity-70"
            >
              {isAdding ? "Adding..." : "Add to cart"}
            </button>
          </div>

          {actionError && (
            <div className="mt-4 text-sm text-rose-700">{actionError}</div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
