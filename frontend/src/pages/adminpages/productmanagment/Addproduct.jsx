import React, { useState } from "react";
import { useCreateProductMutation } from "../../../redux/ApiSlices/productApiSlice";
import { useGetCategoriesQuery } from "../../../redux/ApiSlices/categoryApiSlice";
const CreateProductForm = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    isFeatured: false,
    isRecommended: false,
    // description: "",
  });

  const [image, setImage] = useState(null);

  const [createProduct, { isLoading }] = useCreateProductMutation();
  const { data, isLoading: isLoadingCategories } = useGetCategoriesQuery();
  const categories = data?.categories || [];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // File object
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("category", form.category);
    formData.append("isFeatured", form.isFeatured);
    formData.append("isRecommended", form.isRecommended);
    // formData.append("description", form.description);
    formData.append("image", image); // KEY PART
    
    await createProduct(formData);

    // clear form 
    setForm({
      name: "",
      price: "",
      category: "",
      isFeatured: false,
      isRecommended: false,
      // description: "",
    });
    setImage(null);
  }
  return (
  <div className="mx-auto w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-slate-900">Add product</h2>
      <p className="mt-1 text-sm text-slate-500">Create a new product for your catalog.</p>
    </div>
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-2">
        <label className="text-sm font-medium text-slate-700">Name</label>
        <input
          placeholder="Product name"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-300"
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium text-slate-700">Price</label>
        <input
          type="number"
          name="price"
          value={form.price}
          placeholder="Enter price"
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-300"
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium text-slate-700">Category</label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-300"
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

      <div className="flex flex-wrap gap-4">
        <label className="inline-flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            name="isFeatured"
            checked={form.isFeatured}
            onChange={handleChange}
            className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-400"
          />
          Featured
        </label>
        <label className="inline-flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            name="isRecommended"
            checked={form.isRecommended}
            onChange={handleChange}
            className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-400"
          />
          Recommended
        </label>
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium text-slate-700">Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-full file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-slate-800"
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          disabled={isLoading}
          className="inline-flex items-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? "Creating..." : "Create product"}
        </button>
        <button
          type="button"
          onClick={() =>
            setForm({
              name: "",
              price: "",
              category: "",
              isFeatured: false,
              isRecommended: false,
            })
          }
          className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          Reset
        </button>
      </div>
    </form>
  </div>
);
 
};

export default CreateProductForm;
