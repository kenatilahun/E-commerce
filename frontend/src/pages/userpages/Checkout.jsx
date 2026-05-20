import React from "react";
import { Link } from "react-router-dom";

const summaryItems = [
  { id: "s1", name: "DuoComfort Sofa Premium", price: 20, qty: 1, image: "/images/mock/monitor-1.jpg" },
  { id: "s2", name: "IronOne Desk", price: 25, qty: 1, image: "/images/mock/monitor-1.jpg" },
];

const Checkout = () => {
  const subtotal = 45;
  const shipping = 5;
  const discount = 10;
  const total = subtotal + shipping - discount;

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 px-6 py-5">
          <div className="text-xl font-semibold text-blue-600">FURNEST</div>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            {["Cart", "Review", "Checkout"].map((step, index) => (
              <div key={step} className="flex items-center gap-2">
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full border text-xs font-semibold ${
                    step === "Checkout" ? "border-blue-600 bg-blue-600 text-white" : "border-slate-200 bg-slate-100 text-slate-400"
                  }`}
                >
                  {index + 1}
                </span>
                <span className={step === "Checkout" ? "text-slate-900" : "text-slate-400"}>{step}</span>
              </div>
            ))}
          </div>
        </header>

        <div className="grid gap-0 lg:grid-cols-[1.5fr_1fr]">
          <section className="border-b border-slate-100 px-6 py-8 lg:border-b-0 lg:border-r">
            <h1 className="text-2xl font-semibold text-slate-900">Checkout</h1>
            <p className="mt-1 text-sm text-slate-500">Shipping Information</p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600">D</span>
                Delivery
              </button>
              <button
                type="button"
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500">P</span>
                Pick up
              </button>
            </div>

            <div className="mt-6 grid gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-500">Full name *</label>
                <input
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-700 focus:border-blue-600 focus:outline-none"
                  placeholder="Enter full name"
                  autoComplete="name"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500">Email address *</label>
                <input
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-700 focus:border-blue-600 focus:outline-none"
                  placeholder="Enter email address"
                  autoComplete="email"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500">Phone number *</label>
                <input
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-700 focus:border-blue-600 focus:outline-none"
                  placeholder="Enter phone number"
                  autoComplete="tel"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500">Country *</label>
                <select className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-700 focus:border-blue-600 focus:outline-none">
                  <option>Choose country</option>
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Canada</option>
                </select>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="text-xs font-semibold text-slate-500">City</label>
                  <input className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-blue-600 focus:outline-none" placeholder="Enter city" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500">State</label>
                  <input className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-blue-600 focus:outline-none" placeholder="Enter state" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500">ZIP Code</label>
                  <input className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-blue-600 focus:outline-none" placeholder="Enter ZIP" />
                </div>
              </div>
            </div>

            <label className="mt-6 flex items-center gap-2 text-xs text-slate-500">
              <input type="checkbox" /> I have read and agree to the Terms and Conditions.
            </label>
          </section>

          <aside className="px-6 py-8">
            <div className="text-sm font-semibold text-slate-900">Review your cart</div>
            <div className="mt-4 space-y-4">
              {summaryItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 text-sm">
                  <div className="h-12 w-12 overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-slate-900">{item.name}</div>
                    <div className="text-xs text-slate-400">{item.qty}x</div>
                  </div>
                  <div className="text-xs font-semibold text-slate-900">${item.price.toFixed(2)}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2">
              <input
                className="flex-1 border-0 bg-transparent text-xs text-slate-500 outline-none"
                placeholder="Discount code"
              />
              <button className="text-xs font-semibold text-blue-600">Apply</button>
            </div>

            <div className="mt-6 space-y-2 text-sm text-slate-600">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Shipping</span>
                <span className="font-semibold text-slate-900">${shipping.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Discount</span>
                <span className="font-semibold text-slate-900">-${discount.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-base">
                <span className="font-semibold text-slate-900">Total</span>
                <span className="font-semibold text-blue-600">${total.toFixed(2)}</span>
              </div>
            </div>

            <button className="mt-6 w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700">
              Pay Now
            </button>

            <div className="mt-4 flex items-start gap-2 text-xs text-slate-500">
              <span className="text-blue-600">Lock</span>
              <span>Secure Checkout - SSL Encrypted</span>
            </div>
            <p className="mt-2 text-xs text-slate-400">
              Ensuring your financial and personal details are secure during every transaction.
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
