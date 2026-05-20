import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Lock,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Truck,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Zap,
} from "lucide-react";
import { Button, Input, Label } from "./ui";
import { mapCartItemForMockup, useMockupCartState } from "./useMockupCart";

const steps = ["Cart", "Shipping", "Payment", "Review"];

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items: cartItems, itemCount } = useMockupCartState();
  const orderItems = useMemo(() => cartItems.map(mapCartItemForMockup), [cartItems]);

  const [shipping, setShipping] = useState("standard");
  const [payment, setPayment] = useState("credit-card");
  const [orderOpen, setOrderOpen] = useState(false);
  const [sameAsBilling, setSameAsBilling] = useState(false);

  const shippingCost = shipping === "express" ? 9.99 : shipping === "overnight" ? 24.99 : 0;
  const subtotal = orderItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const tax = Math.round(subtotal * 0.085 * 100) / 100;
  const total = subtotal + tax + shippingCost;

  const Field = ({ label, placeholder, type = "text", span2 = false }) => (
    <div className={span2 ? "md:col-span-2" : ""}>
      <Label className="text-sm font-semibold text-slate-700 mb-1.5 block">{label}</Label>
      <Input type={type} placeholder={placeholder} className="h-12 bg-slate-50 border-slate-200 focus:border-blue-500 focus-visible:ring-blue-500/20 rounded-xl text-sm" />
    </div>
  );

  const ShippingOption = ({ id, title, sub, cost }) => (
    <div onClick={() => setShipping(id)} className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${shipping === id ? "border-blue-600 bg-blue-50" : "border-slate-200 hover:border-slate-300 bg-white"}`}>
      <div className="flex items-center gap-3">
        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${shipping === id ? "border-blue-600" : "border-slate-300"}`}>
          {shipping === id && <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />}
        </div>
        <div>
          <p className="font-bold text-slate-900 text-sm">{title}</p>
          <p className="text-xs text-slate-500">{sub}</p>
        </div>
      </div>
      <span className={`font-black text-sm ${shipping === id ? "text-blue-600" : "text-slate-700"}`}>{cost}</span>
    </div>
  );

  const PaymentOption = ({ id, label, children }) => (
    <div className={`border-2 rounded-xl overflow-hidden transition-all ${payment === id ? "border-blue-600" : "border-slate-200"}`}>
      <div onClick={() => setPayment(id)} className={`flex items-center gap-3 p-4 cursor-pointer ${payment === id ? "bg-blue-50" : "bg-white hover:bg-slate-50"}`}>
        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${payment === id ? "border-blue-600" : "border-slate-300"}`}>
          {payment === id && <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />}
        </div>
        {label}
      </div>
      {payment === id && children && <div className="p-5 border-t border-slate-100 bg-white space-y-4">{children}</div>}
    </div>
  );

  if (!orderItems.length) {
    return (
      <div className="electronics-shop-mockup min-h-screen bg-slate-50 font-sans flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl border border-slate-200 p-12 shadow-sm text-center max-w-lg">
          <h1 className="text-3xl font-black text-slate-900">Your checkout is empty</h1>
          <p className="mt-3 text-sm text-slate-500">Add items to your cart first, then we can carry them through this checkout design.</p>
          <Button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 h-12 font-bold" onClick={() => navigate("/products")}>Browse Products</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="electronics-shop-mockup min-h-screen bg-slate-50 font-sans pb-20">
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-between h-18 py-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
                <Zap className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-2xl font-black text-slate-900">Electro<span className="text-blue-600">Zone</span></span>
            </div>
            <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 px-4 py-2 rounded-full text-sm font-bold border border-emerald-200">
              <Lock className="w-4 h-4" /> Secure Checkout
            </div>
          </div>
        </div>
      </header>

      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 max-w-4xl py-5">
          <div className="relative flex items-center justify-between">
            <div className="absolute left-0 right-0 top-4 h-0.5 bg-slate-200 -z-10" />
            <div className="absolute left-0 w-1/3 top-4 h-0.5 bg-blue-600 -z-10" />
            {steps.map((step, i) => (
              <div key={step} className="flex flex-col items-center gap-2 bg-white px-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-sm transition-all ${i === 0 ? "bg-emerald-500 text-white" : i === 1 ? "bg-blue-600 text-white ring-4 ring-blue-100 shadow-md shadow-blue-600/20" : "bg-slate-100 text-slate-400 border border-slate-200"}`}>
                  {i === 0 ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
                </div>
                <span className={`text-xs font-bold ${i === 1 ? "text-blue-600" : i === 0 ? "text-emerald-600" : "text-slate-400"}`}>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-[58%] space-y-6">
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2.5 mb-5">
                <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-black">1</span>
                Contact Information
                <span className="ml-auto text-sm font-normal text-blue-600 cursor-pointer hover:underline">Log in</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Email Address *" placeholder="john@example.com" type="email" />
                <Field label="Phone Number *" placeholder="(555) 123-4567" type="tel" />
              </div>
              <label className="flex items-center gap-2 mt-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-blue-600" />
                <span className="text-sm text-slate-500">Email me with exclusive offers and tech news</span>
              </label>
            </section>

            <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2.5 mb-5">
                <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-black">2</span>
                Shipping Address
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="First Name *" placeholder="John" />
                <Field label="Last Name *" placeholder="Doe" />
                <Field label="Street Address *" placeholder="123 Tech Blvd" span2 />
                <Field label="Apt, Suite, etc. (optional)" placeholder="Apt 4B" span2 />
                <Field label="City *" placeholder="San Francisco" />
                <div>
                  <Label className="text-sm font-semibold text-slate-700 mb-1.5 block">State *</Label>
                  <select className="w-full h-12 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 focus:outline-none focus:border-blue-500">
                    <option>California</option><option>New York</option><option>Texas</option><option>Florida</option>
                  </select>
                </div>
                <Field label="ZIP Code *" placeholder="94105" />
                <div>
                  <Label className="text-sm font-semibold text-slate-700 mb-1.5 block">Country *</Label>
                  <select className="w-full h-12 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 focus:outline-none focus:border-blue-500">
                    <option>United States</option><option>Canada</option><option>United Kingdom</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 cursor-pointer" onClick={() => setSameAsBilling((b) => !b)}>
                    <div className={`w-4 h-4 rounded border flex items-center justify-center ${sameAsBilling ? "bg-blue-600 border-blue-600" : "border-slate-300"}`}>
                      {sameAsBilling && <span className="text-white text-[10px] font-black">&#10003;</span>}
                    </div>
                    <span className="text-sm text-slate-500">Billing address same as shipping</span>
                  </label>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2.5 mb-5">
                <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-black">3</span>
                Shipping Method
              </h2>
              <div className="space-y-3">
                <ShippingOption id="standard" title="Standard Delivery" sub="5-7 Business Days" cost="FREE" />
                <ShippingOption id="express" title="Express Delivery" sub="2-3 Business Days" cost="$9.99" />
                <ShippingOption id="overnight" title="Overnight Delivery" sub="Next Business Day by 12pm" cost="$24.99" />
              </div>
            </section>

            <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2.5 mb-5">
                <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-black">4</span>
                Payment
              </h2>
              <div className="space-y-3">
                <PaymentOption
                  id="credit-card"
                  label={
                    <div className="flex items-center justify-between flex-1">
                      <span className="font-bold text-slate-900 flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-slate-500" /> Credit / Debit Card
                      </span>
                      <div className="flex gap-1">
                        {["VISA", "MC", "AMEX"].map((p) => (
                          <div key={p} className="h-6 px-2 bg-slate-200 rounded text-[9px] font-black flex items-center text-slate-600">{p}</div>
                        ))}
                      </div>
                    </div>
                  }
                >
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-semibold text-slate-700 mb-1.5 block">Name on Card</Label>
                      <Input placeholder="John Doe" className="h-12 bg-slate-50 border-slate-200 rounded-xl" />
                    </div>
                    <div className="relative">
                      <Label className="text-sm font-semibold text-slate-700 mb-1.5 block">Card Number</Label>
                      <Input placeholder="0000 0000 0000 0000" className="h-12 bg-slate-50 border-slate-200 rounded-xl pl-11" />
                      <CreditCard className="w-5 h-5 text-slate-400 absolute left-3 top-[calc(50%+10px)] -translate-y-1/2" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-semibold text-slate-700 mb-1.5 block">Expiration</Label>
                        <Input placeholder="MM / YY" className="h-12 bg-slate-50 border-slate-200 rounded-xl" />
                      </div>
                      <div>
                        <Label className="text-sm font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
                          CVC <AlertCircle className="w-4 h-4 text-slate-400 cursor-help" />
                        </Label>
                        <Input placeholder="123" className="h-12 bg-slate-50 border-slate-200 rounded-xl" />
                      </div>
                    </div>
                  </div>
                </PaymentOption>

                <PaymentOption id="paypal" label={<span className="font-black text-[#003087] text-lg italic tracking-tight">Pay<span className="text-[#009cde]">Pal</span></span>} />
                <PaymentOption id="apple-pay" label={<div className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-black flex items-center justify-center"><span className="text-white text-xs font-black"></span></div><span className="font-black text-slate-900">Apple Pay</span></div>} />
              </div>

              <div className="mt-5 pt-5 border-t border-slate-100">
                <Label className="text-sm font-semibold text-slate-700 mb-1.5 block">Order Notes (optional)</Label>
                <textarea placeholder="Special delivery instructions or notes..." className="w-full h-20 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 resize-none" />
              </div>
            </section>
          </div>

          <div className="w-full lg:w-[42%]">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sticky top-6">
              <button className="w-full flex items-center justify-between mb-4 lg:cursor-default" onClick={() => setOrderOpen((o) => !o)}>
                <h2 className="text-lg font-black text-slate-900">Order Summary</h2>
                <span className="lg:hidden text-blue-600">{orderOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}</span>
              </button>

              <div className={`space-y-3 mb-5 ${orderOpen ? "block" : "hidden lg:block"}`}>
                {orderItems.map((item) => (
                  <div key={item.id} className="flex gap-3 items-center">
                    <div className="relative shrink-0">
                      <div className="w-14 h-14 rounded-xl overflow-hidden border border-slate-100 bg-slate-50">
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-slate-500 text-white text-[10px] font-black rounded-full flex items-center justify-center">{item.quantity}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-900 text-xs leading-snug line-clamp-1">{item.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{item.specs}</p>
                    </div>
                    <span className="font-bold text-sm text-slate-900 shrink-0">${item.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-100 pt-4 space-y-3 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal ({itemCount} items)</span>
                  <span className="font-bold text-slate-900">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span className={`font-bold ${shippingCost === 0 ? "text-emerald-600" : "text-slate-900"}`}>
                    {shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Tax (8.5%)</span>
                  <span className="font-bold text-slate-900">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t border-slate-100 mt-4 pt-4 mb-6 flex justify-between items-end">
                <div>
                  <span className="text-base font-black text-slate-900">Total</span>
                  <p className="text-xs text-slate-400">All taxes &amp; fees included</p>
                </div>
                <span className="text-3xl font-black text-blue-600">${total.toFixed(2)}</span>
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white h-14 rounded-xl text-base font-black shadow-xl shadow-blue-600/20 mb-4">
                <Lock className="w-4 h-4 mr-2" /> Place Order
              </Button>

              <div className="text-center space-y-3">
                <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>100% Secure &amp; Encrypted Transaction</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  By placing your order, you agree to our <Link to="/" className="underline hover:text-slate-600">Terms</Link> &amp; <Link to="/" className="underline hover:text-slate-600">Privacy Policy</Link>.
                </p>
                <div className="flex justify-center items-center gap-2 mt-2">
                  <Truck className="w-4 h-4 text-slate-400" />
                  <span className="text-xs text-slate-500">Ships from our US warehouse in 1-2 business days</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
