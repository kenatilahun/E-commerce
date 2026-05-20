import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetProductsByCategorySlugQuery } from "../../redux/ApiSlices/categoryApiSlice";

const mockProducts = [
  { _id: "p1", name: "Nova Ultra 6.7 Smartphone", price: 899, rating: 4.8, reviews: 1642, image: "/images/mock/smartphone-1.jpg" },
  { _id: "p2", name: "Nimbus Pro 14 Laptop", price: 1249, rating: 4.7, reviews: 1248, image: "/images/mock/laptop-1.jpg" },
  { _id: "p3", name: "Orbit 11 Tablet", price: 529, rating: 4.5, reviews: 731, image: "/images/mock/tablet-1.jpg" },
  { _id: "p4", name: "Aura Noise-Canceling Headphones", price: 249, rating: 4.6, reviews: 588, image: "/images/mock/headphones-1.jpg" },
  { _id: "p5", name: "Pulse Max Smartwatch", price: 299, rating: 4.5, reviews: 411, image: "/images/mock/smartwatch-1.jpg" },
  { _id: "p6", name: "Nova Buds Pro", price: 129, rating: 4.4, reviews: 198, image: "/images/mock/earbuds-1.jpg" },
  { _id: "p7", name: "Nimbus 27" + " 4K Monitor", price: 399, rating: 4.5, reviews: 211, image: "/images/mock/monitor-1.jpg" },
  { _id: "p8", name: "Nimbus Air 13 Laptop", price: 999, rating: 4.6, reviews: 892, image: "/images/mock/laptop-1.jpg" },
  { _id: "p9", name: "Nimbus Lite 13 Laptop", price: 849, rating: 4.4, reviews: 324, image: "/images/mock/laptop-1.jpg" },
  { _id: "p10", name: "Nimbus Core 14 Laptop", price: 899, rating: 4.3, reviews: 271, image: "/images/mock/laptop-1.jpg" },
  { _id: "p11", name: "Nimbus Edge 14 Laptop", price: 1049, rating: 4.5, reviews: 447, image: "/images/mock/laptop-1.jpg" },
  { _id: "p12", name: "Nimbus Pro Dock", price: 199, rating: 4.6, reviews: 156, image: "/images/mock/monitor-1.jpg" },
];

const StarRow = ({ rating = 0 }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <svg
        key={star}
        viewBox="0 0 20 20"
        className={`h-4 w-4 ${rating >= star ? "text-amber-500" : "text-slate-200"}`}
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M10 1.5l2.4 5 5.6.8-4 3.9.9 5.6L10 14.8 5.1 16.8l.9-5.6-4-3.9 5.6-.8L10 1.5z" />
      </svg>
    ))}
  </div>
);

const CategoryProducts = () => {
  const { slug } = useParams();
  const { data, isLoading, isError } = useGetProductsByCategorySlugQuery(slug);
  const category = data?.category;
  const products = data?.products || [];
  const [showFilters, setShowFilters] = useState(false);

  const displayCategory = category?.name || "Smartphones";
  const list = useMemo(() => (products.length ? products : mockProducts), [products]);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="text-xs text-slate-500">Home &gt; {displayCategory}</div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowFilters((prev) => !prev)}
            className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm md:hidden"
          >
            Filters
          </button>
          <select className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700">
            <option>Sort by: Popularity</option>
            <option>Price</option>
            <option>Newest</option>
          </select>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">{displayCategory}</h1>
          <div className="mt-2 text-sm text-slate-500">Showing 112 of 120 products</div>
        </div>
      </div>

      {(isLoading || isError) && (
        <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
          {isLoading ? "Loading products from the server. Showing mock catalog." : "Unable to load products. Showing mock catalog."}
        </div>
      )}

      <div className="grid gap-8 md:grid-cols-[240px_1fr]">
        <aside
          className={`space-y-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ${showFilters ? "block" : "hidden"} md:block`}
        >
          <div className="flex items-center justify-between">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Filters</div>
            <button className="text-xs font-semibold text-blue-600">Clear Filters</button>
          </div>

          <div className="space-y-3 border-t border-slate-100 pt-4">
            <div className="text-sm font-semibold text-slate-900">Price Range</div>
            <div className="h-1 rounded-full bg-slate-100">
              <div className="h-1 w-2/3 rounded-full bg-blue-600" />
            </div>
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>$200</span>
              <span>$2000</span>
            </div>
          </div>

          <div className="space-y-3 border-t border-slate-100 pt-4">
            <div className="text-sm font-semibold text-slate-900">Category</div>
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input type="checkbox" defaultChecked /> Smartphones
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input type="checkbox" /> Laptops
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input type="checkbox" /> Audio & Wearables
            </label>
          </div>

          <div className="space-y-3 border-t border-slate-100 pt-4">
            <div className="text-sm font-semibold text-slate-900">Brand</div>
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input type="checkbox" defaultChecked /> Nova
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input type="checkbox" /> Nimbus
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input type="checkbox" /> Orbit
            </label>
          </div>

          <div className="space-y-3 border-t border-slate-100 pt-4">
            <div className="text-sm font-semibold text-slate-900">Rating</div>
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input type="checkbox" /> 4.5 & up
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input type="checkbox" /> 4.0 & up
            </label>
          </div>
        </aside>

        <section>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {list.map((item) => (
              <Link
                to={`/product/${item._id}`}
                key={item._id}
                className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative overflow-hidden rounded-xl bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-48 w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-600 shadow"
                    aria-label="Add to wishlist"
                  >
                    ❤
                  </button>
                </div>
                <div className="mt-4">
                  <div className="line-clamp-2 text-sm font-semibold text-slate-900">{item.name}</div>
                  <div className="mt-2 text-lg font-semibold text-slate-900">${item.price}</div>
                  <div className="mt-2 flex items-center justify-between">
                    <StarRow rating={item.rating} />
                    <button className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500">
            <div>Showing 112 of 120 products</div>
            <div className="flex items-center gap-2">
              <button className="rounded-full border border-slate-200 bg-white px-3 py-1">Prev</button>
              <button className="rounded-full border border-slate-200 bg-white px-3 py-1">1</button>
              <button className="rounded-full border border-slate-200 bg-white px-3 py-1">2</button>
              <button className="rounded-full border border-slate-200 bg-white px-3 py-1">3</button>
              <button className="rounded-full border border-slate-200 bg-white px-3 py-1">Next</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CategoryProducts;
