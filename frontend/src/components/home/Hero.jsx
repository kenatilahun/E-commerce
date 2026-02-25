import React from "react";
import { Link } from "react-router-dom";

const Hero = ({ products = [], isLoading, isError }) => {
  const preview = products.slice(0, 3);

  return (
    <section className="relative overflow-hidden rounded-[28px] border border-amber-100 bg-gradient-to-br from-amber-50 via-white to-emerald-50 p-6 shadow-sm sm:p-10">
      <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-amber-200/40 blur-3xl" />
      <div className="absolute -bottom-20 right-0 h-64 w-64 rounded-full bg-emerald-200/40 blur-3xl" />

      <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">
            Fresh drops every week
          </div>
          <div className="space-y-3">
            <h1 className="font-display text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Build a look that feels like you.
            </h1>
            <p className="max-w-xl text-sm text-slate-600 sm:text-base">
              Explore curated categories and editor picks. Every product is selected to keep your
              cart simple and your style elevated.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/categories"
              className="inline-flex items-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
            >
              Shop categories
            </Link>
            <Link
              to="/categories"
              className="inline-flex items-center rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              Explore products
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: "Fast shipping", value: "2-4 days" },
              { label: "Flexible returns", value: "30 days" },
              { label: "Secure checkout", value: "256-bit" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/70 bg-white/70 px-4 py-3 text-sm text-slate-700 shadow-sm backdrop-blur">
                <div className="text-xs uppercase tracking-[0.25em] text-slate-400">{item.label}</div>
                <div className="mt-1 font-semibold text-slate-900">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-4 sm:space-y-6">
            {isLoading && (
              <div className="h-40 rounded-2xl border border-dashed border-amber-200 bg-white/70" />
            )}
            {isError && (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
                Unable to load hero products.
              </div>
            )}
            {!isLoading &&
              !isError &&
              preview.slice(0, 2).map((product, index) => (
                <div
                  key={product._id || index}
                  className={`overflow-hidden rounded-2xl border border-white/70 bg-white/80 shadow-sm ${index % 2 === 0 ? "float-slow" : "float-slower"}`}
                >
                  <div className="h-32 w-full bg-slate-100">
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-slate-400">No image</div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="text-sm font-semibold text-slate-900">{product.name}</div>
                    <div className="mt-1 text-xs text-slate-500">{product.category?.name || "Featured"}</div>
                  </div>
                </div>
              ))}
          </div>
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="text-xs uppercase tracking-[0.3em] text-slate-400">Editor pick</div>
              <div className="mt-3 text-lg font-semibold text-slate-900">Daily essentials bundle</div>
              <p className="mt-2 text-sm text-slate-600">
                Save 18% on a ready-to-wear set curated by our merch team.
              </p>
              <Link
                to="/categories"
                className="mt-4 inline-flex items-center text-sm font-semibold text-slate-900 hover:underline"
              >
                View the edit
              </Link>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 text-sm text-emerald-800 shadow-sm">
              <div className="text-xs uppercase tracking-[0.25em] text-emerald-500">Limited time</div>
              <div className="mt-2 text-base font-semibold">Free shipping over $75</div>
              <p className="mt-2 text-emerald-700">
                Refresh your cart today and we will cover the delivery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
