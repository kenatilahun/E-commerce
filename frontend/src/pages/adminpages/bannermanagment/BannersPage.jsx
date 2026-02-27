import React, { useMemo, useState } from "react";
import {
  useCreateBannerMutation,
  useDeleteBannerMutation,
  useGetAdminBannersQuery,
  useUpdateBannerMutation,
} from "../../../redux/ApiSlices/bannerApiSlice";

const POSITIONS = [
  { value: "hero_main", label: "Hero Main" },
  { value: "hero_side", label: "Hero Side" },
  { value: "category_promo", label: "Category Promo" },
  { value: "deal_promo", label: "Deal Promo" },
  { value: "accessory_side", label: "Accessory Side" },
  { value: "recent_side", label: "Recent Side" },
  { value: "summer_left", label: "Summer Left" },
  { value: "summer_bottom", label: "Summer Bottom" },
  { value: "bottom_cta", label: "Bottom CTA" },
];

const emptyForm = {
  title: "",
  subtitle: "",
  link: "",
  position: "hero_main",
  isActive: true,
  sortOrder: 0,
  startDate: "",
  endDate: "",
};

const BannersPage = () => {
  const [form, setForm] = useState(emptyForm);
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const { data, isLoading, isError, error, refetch } = useGetAdminBannersQuery();
  const [createBanner] = useCreateBannerMutation();
  const [updateBanner] = useUpdateBannerMutation();
  const [deleteBanner] = useDeleteBannerMutation();

  const banners = data?.banners || [];

  const positionStats = useMemo(() => {
    const map = new Map();
    for (const item of banners) {
      map.set(item.position, (map.get(item.position) || 0) + 1);
    }
    return POSITIONS.map((pos) => ({ ...pos, count: map.get(pos.value) || 0 }));
  }, [banners]);

  const setFromBanner = (banner) => {
    setEditingId(banner._id);
    setImage(null);
    setForm({
      title: banner.title || "",
      subtitle: banner.subtitle || "",
      link: banner.link || "",
      position: banner.position || "hero_main",
      isActive: banner.isActive ?? true,
      sortOrder: banner.sortOrder ?? 0,
      startDate: banner.startDate ? new Date(banner.startDate).toISOString().slice(0, 10) : "",
      endDate: banner.endDate ? new Date(banner.endDate).toISOString().slice(0, 10) : "",
    });
  };

  const resetForm = () => {
    setForm(emptyForm);
    setImage(null);
    setEditingId(null);
  };

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const buildFormData = () => {
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("subtitle", form.subtitle);
    formData.append("link", form.link);
    formData.append("position", form.position);
    formData.append("isActive", form.isActive);
    formData.append("sortOrder", form.sortOrder);
    formData.append("startDate", form.startDate || "");
    formData.append("endDate", form.endDate || "");
    if (image) formData.append("image", image);
    return formData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const formData = buildFormData();
      if (editingId) {
        await updateBanner({ id: editingId, formData }).unwrap();
      } else {
        await createBanner(formData).unwrap();
      }
      resetForm();
    } catch (err) {
      alert(err?.data?.message || "Failed to save banner");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, title) => {
    const ok = window.confirm(`Delete banner "${title}"?`);
    if (!ok) return;
    try {
      await deleteBanner(id).unwrap();
      if (editingId === id) resetForm();
    } catch (err) {
      alert(err?.data?.message || "Failed to delete banner");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Homepage Banners</h2>
          <p className="mt-1 text-sm text-slate-500">
            Manage image banners by position, order, active status, and schedule.
          </p>
        </div>
        <button
          onClick={refetch}
          className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          Refresh
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {positionStats.map((pos) => (
          <div key={pos.value} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{pos.label}</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">{pos.count}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-slate-900">{editingId ? "Edit Banner" : "Create Banner"}</h3>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700"
            >
              Cancel Edit
            </button>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <label className="text-sm font-medium text-slate-700">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={onChange}
              required
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium text-slate-700">Position</label>
            <select
              name="position"
              value={form.position}
              onChange={onChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm"
            >
              {POSITIONS.map((pos) => (
                <option key={pos.value} value={pos.value}>
                  {pos.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-700">Subtitle</label>
            <input
              name="subtitle"
              value={form.subtitle}
              onChange={onChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm"
            />
          </div>

          <div className="grid gap-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-700">Link</label>
            <input
              name="link"
              value={form.link}
              onChange={onChange}
              placeholder="/categories or /product/123"
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium text-slate-700">Sort Order</label>
            <input
              type="number"
              name="sortOrder"
              value={form.sortOrder}
              onChange={onChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium text-slate-700">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-full file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium text-slate-700">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={onChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium text-slate-700">End Date</label>
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={onChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm"
            />
          </div>
        </div>

        <label className="mt-4 inline-flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            name="isActive"
            checked={form.isActive}
            onChange={onChange}
            className="h-4 w-4 rounded border-slate-300"
          />
          Active
        </label>

        <div className="mt-5 flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white"
          >
            {saving ? "Saving..." : editingId ? "Update Banner" : "Create Banner"}
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
          >
            Reset
          </button>
        </div>
      </form>

      {isLoading && (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center text-sm text-slate-500">
          Loading banners...
        </div>
      )}

      {isError && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700">
          <div className="font-semibold">Unable to load banners</div>
          <p className="mt-1">{error?.data?.message || "Something went wrong."}</p>
        </div>
      )}

      {!isLoading && !isError && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Banner</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Position</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Order</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {banners.map((banner) => (
                  <tr key={banner._id} className="hover:bg-slate-50">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-16 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                          {banner.image ? (
                            <img src={banner.image} alt={banner.title} className="h-full w-full object-cover" />
                          ) : null}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-900">{banner.title}</div>
                          <div className="text-xs text-slate-500">{banner.link || "-"}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-700">{banner.position}</td>
                    <td className="px-4 py-4 text-sm text-slate-700">{banner.sortOrder}</td>
                    <td className="px-4 py-4 text-sm">
                      <span
                        className={[
                          "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
                          banner.isActive ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600",
                        ].join(" ")}
                      >
                        {banner.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setFromBanner(banner)}
                          className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(banner._id, banner.title)}
                          className="rounded-full border border-rose-200 bg-white px-3 py-1.5 text-xs font-semibold text-rose-700"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannersPage;
