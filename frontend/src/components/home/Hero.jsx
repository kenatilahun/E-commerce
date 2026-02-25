import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const Hero = ({ products = [], isLoading, isError }) => {
  const slides = useMemo(() => {
    const productSlides = products.slice(0, 3).map((product) => ({
      type: "product",
      id: product._id,
      title: product.name,
      subtitle: product.category?.name || "Featured pick",
      image: product.image || "",
      cta: {
        label: "View product",
        to: `/product/${product._id}`,
      },
    }));

    return [
      {
        type: "marketing",
        id: "intro",
        title: "Build a look that feels like you.",
        subtitle: "Explore curated categories and editor picks made for every day.",
        cta: { label: "Shop categories", to: "/categories" },
      },
      ...productSlides,
    ];
  }, [products]);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return undefined;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    if (activeIndex >= slides.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, slides.length]);

  const activeSlide = slides[activeIndex] || slides[0];

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
              {activeSlide?.title || "Shop the latest edits"}
            </h1>
            <p className="max-w-xl text-sm text-slate-600 sm:text-base">
              {activeSlide?.subtitle ||
                "Explore curated categories and editor picks. Every product is selected to keep your cart simple and your style elevated."}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to={activeSlide?.cta?.to || "/categories"}
              className="inline-flex items-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
            >
              {activeSlide?.cta?.label || "Shop categories"}
            </Link>
            <Link
              to="/categories"
              className="inline-flex items-center rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              Explore more
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

        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-2xl border border-white/70 bg-white/80 shadow-sm">
            <div className="relative h-64 w-full bg-slate-100 sm:h-72">
              {activeSlide?.type === "product" && activeSlide?.image ? (
                <>
                  <img src={activeSlide.image} alt={activeSlide.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <div className="text-xs uppercase tracking-[0.3em] text-white/70">Featured product</div>
                    <div className="mt-2 text-xl font-semibold">{activeSlide.title}</div>
                    <div className="mt-1 text-sm text-white/80">{activeSlide.subtitle}</div>
                  </div>
                </>
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-slate-400">
                  {isLoading ? "Loading hero..." : "Featured story"}
                </div>
              )}
            </div>
            {activeSlide?.type !== "product" && (
              <div className="p-5">
                <div className="text-xs uppercase tracking-[0.3em] text-slate-400">Editor pick</div>
                <div className="mt-2 text-lg font-semibold text-slate-900">
                  {activeSlide?.title || "Daily essentials bundle"}
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  Save 18% on a ready-to-wear set curated by our merch team.
                </p>
              </div>
            )}
            <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-2 py-1 text-xs font-semibold text-slate-600">
              {activeIndex + 1} / {slides.length}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length)}
              className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={() => setActiveIndex((prev) => (prev + 1) % slides.length)}
              className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              Next
            </button>
            <div className="ml-auto flex items-center gap-2">
              {slides.map((slide, index) => (
                <button
                  key={slide.id || index}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={[
                    "h-2.5 w-2.5 rounded-full border",
                    index === activeIndex ? "border-slate-900 bg-slate-900" : "border-slate-300 bg-white",
                  ].join(" ")}
                />
              ))}
            </div>
          </div>

          {isError && (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
              Unable to load hero products.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
