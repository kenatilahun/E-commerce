import React, { useState } from "react";
import { useCreateCategoryMutation } from "../../../redux/ApiSlices/categoryApiSlice";

const AddCategory = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    isActive: true,
  });
  const [image, setImage] = useState(null);
  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("isActive", form.isActive);
    if (image) formData.append("image", image);

    await createCategory(formData);

    setForm({
      name: "",
      description: "",
      isActive: true,
    });
    setImage(null);
  };

  return (
    <div className="mx-auto w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">Add category</h2>
        <p className="mt-1 text-sm text-slate-500">Create a category for your catalog.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-2">
          <label className="text-sm font-medium text-slate-700">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Category name"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-300"
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium text-slate-700">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Short description"
            rows="4"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-300"
          />
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

        <label className="inline-flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            name="isActive"
            checked={form.isActive}
            onChange={handleChange}
            className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-400"
          />
          Active
        </label>

        <div className="flex items-center gap-3">
          <button
            disabled={isLoading}
            className="inline-flex items-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? "Creating..." : "Create category"}
          </button>
          <button
            type="button"
            onClick={() =>
              setForm({
                name: "",
                description: "",
                isActive: true,
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

export default AddCategory;
