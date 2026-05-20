import React, { useMemo, useState } from "react";
import { useCreateProductMutation } from "../../../redux/ApiSlices/productApiSlice";
import { useGetCategoriesQuery } from "../../../redux/ApiSlices/categoryApiSlice";

const initialForm = {
  name: "",
  brand: "",
  category: "",
  price: "",
  originalPrice: "",
  countInStock: "",
  rating: "",
  numReviews: "",
  description: "",
  isFeatured: false,
  isRecommended: false,
};

const inputClassName =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-300";

const CreateProductForm = () => {
  const [form, setForm] = useState(initialForm);
  const [image, setImage] = useState(null);

  const [createProduct, { isLoading }] = useCreateProductMutation();
  const { data, isLoading: isLoadingCategories } = useGetCategoriesQuery();
  const categories = data?.categories || [];

  const badgeSummary = useMemo(() => {
    const badges = [];
    if (form.isFeatured) badges.push("Featured");
    if (form.isRecommended) badges.push("Recommended");
    if (form.brand.trim()) badges.push(form.brand.trim());
    return badges;
  }, [form.brand, form.isFeatured, form.isRecommended]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (event) => {
    setImage(event.target.files?.[0] || null);
  };

  const resetForm = () => {
    setForm(initialForm);
    setImage(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name.trim());
    formData.append("brand", form.brand.trim());
    formData.append("price", form.price);
    formData.append("originalPrice", form.originalPrice || 0);
    formData.append("countInStock", form.countInStock || 0);
    formData.append("rating", form.rating || 0);
    formData.append("numReviews", form.numReviews || 0);
    formData.append("description", form.description.trim());
    formData.append("category", form.category);
    formData.append("isFeatured", form.isFeatured);
    formData.append("isRecommended", form.isRecommended);

    if (image) {
      formData.append("image", image);
    }

    await createProduct(formData).unwrap();
    resetForm();
  };

  return (
    <div className="mx-auto w-full max-w-5xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
      <div className="mb-8 flex flex-col gap-4 border-b border-slate-100 pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Create product</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            Add the merchandising details the current storefront design needs:
            brand, pricing, stock, description, and homepage merchandising flags.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
          <div className="font-semibold text-slate-900">Design alignment</div>
          <div className="mt-1">
            {badgeSummary.length > 0 ? badgeSummary.join(" • ") : "No merchandising badges selected yet"}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1.45fr_0.95fr]">
        <div className="space-y-8">
          <section className="space-y-5">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Core Details</h3>
              <p className="mt-1 text-sm text-slate-500">These fields drive the product cards and detail view.</p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="grid gap-2 md:col-span-2">
                <label className="text-sm font-medium text-slate-700">Product Name</label>
                <input
                  placeholder='e.g. Apple MacBook Pro 16" M3 Pro'
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className={inputClassName}
                  required
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium text-slate-700">Brand</label>
                <input
                  placeholder="e.g. Apple"
                  name="brand"
                  value={form.brand}
                  onChange={handleChange}
                  className={inputClassName}
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium text-slate-700">Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className={inputClassName}
                  required
                >
                  <option value="">Select a category</option>
                  {isLoadingCategories && <option>Loading...</option>}
                  {!isLoadingCategories &&
                    categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium text-slate-700">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={5}
                placeholder="Write the product story, key highlights, and why it deserves space in the current storefront."
                className={`${inputClassName} min-h-32 resize-y`}
              />
            </div>
          </section>

          <section className="space-y-5">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Pricing & Stock</h3>
              <p className="mt-1 text-sm text-slate-500">Supports discount display, availability, and richer product cards.</p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium text-slate-700">Price</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  name="price"
                  value={form.price}
                  placeholder="2499"
                  onChange={handleChange}
                  className={inputClassName}
                  required
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium text-slate-700">Original Price</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  name="originalPrice"
                  value={form.originalPrice}
                  placeholder="2799"
                  onChange={handleChange}
                  className={inputClassName}
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium text-slate-700">Stock</label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  name="countInStock"
                  value={form.countInStock}
                  placeholder="24"
                  onChange={handleChange}
                  className={inputClassName}
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium text-slate-700">Rating</label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  name="rating"
                  value={form.rating}
                  placeholder="4.8"
                  onChange={handleChange}
                  className={inputClassName}
                />
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="grid gap-2">
                <label className="text-sm font-medium text-slate-700">Reviews Count</label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  name="numReviews"
                  value={form.numReviews}
                  placeholder="2847"
                  onChange={handleChange}
                  className={inputClassName}
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium text-slate-700">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-full file:border-0 file:bg-slate-900 file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-white hover:file:bg-slate-800"
                  required
                />
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Merchandising</h3>
            <div className="mt-4 space-y-4">
              <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={form.isFeatured}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-400"
                />
                <div>
                  <div className="font-semibold text-slate-900">Featured Product</div>
                  <div className="mt-1 text-sm text-slate-500">Makes this item ready for homepage spotlight sections.</div>
                </div>
              </label>

              <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                <input
                  type="checkbox"
                  name="isRecommended"
                  checked={form.isRecommended}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-400"
                />
                <div>
                  <div className="font-semibold text-slate-900">Recommended</div>
                  <div className="mt-1 text-sm text-slate-500">Useful for carousel picks, “you may also like”, and curated lists.</div>
                </div>
              </label>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Quick Preview</h3>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                {form.countInStock ? `${form.countInStock} in stock` : "Stock not set"}
              </span>
            </div>

            <div className="mt-5 rounded-3xl border border-slate-200 bg-slate-950 p-4 text-white">
              <div className="aspect-[4/3] rounded-2xl border border-slate-800 bg-slate-900/60 flex items-center justify-center text-center text-xs uppercase tracking-[0.3em] text-slate-500">
                {image ? image.name : "Product Image"}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {badgeSummary.length > 0 ? (
                  badgeSummary.map((badge) => (
                    <span key={badge} className="rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-1 text-[11px] font-semibold text-blue-300">
                      {badge}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-500">Add brand or merchandising flags to preview badges.</span>
                )}
              </div>
              <div className="mt-4 text-lg font-bold text-white">{form.name || "Product name preview"}</div>
              <div className="mt-2 flex items-center gap-2 text-sm">
                {form.originalPrice ? (
                  <span className="text-slate-500 line-through">${Number(form.originalPrice || 0).toLocaleString()}</span>
                ) : null}
                <span className="text-xl font-black text-blue-400">${Number(form.price || 0).toLocaleString()}</span>
              </div>
              <div className="mt-3 text-sm text-slate-400 line-clamp-3">
                {form.description || "Your description will show here and help match the current storefront storytelling."}
              </div>
            </div>
          </section>

          <div className="flex flex-wrap items-center gap-3">
            <button
              disabled={isLoading}
              className="inline-flex items-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? "Creating..." : "Create product"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              Reset
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProductForm;
