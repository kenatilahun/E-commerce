import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Search,
  User,
  Trash2,
  Minus,
  Plus,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Tag,
  Zap,
  ChevronRight,
  Star,
} from "lucide-react";
import { Button, Input, Badge } from "./ui";
import { useGetProductsQuery } from "../../../redux/ApiSlices/productApiSlice";
import { mapCartItemForMockup, useMockupCartActions, useMockupCartState } from "./useMockupCart";

export default function CartPage() {
  const navigate = useNavigate();
  const { data } = useGetProductsQuery();
  const products = data?.products || [];
  const { items: cartItems, itemCount } = useMockupCartState();
  const { updateCartQty, removeCartLine, isUpdating, isRemoving } = useMockupCartActions();

  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [removingId, setRemovingId] = useState("");

  const items = useMemo(() => cartItems.map(mapCartItemForMockup), [cartItems]);
  const cartProductIds = useMemo(() => new Set(items.map((item) => item.productId).filter(Boolean)), [items]);
  const recommended = useMemo(
    () => products.filter((product) => !cartProductIds.has(product._id)).slice(0, 4),
    [products, cartProductIds],
  );

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const tax = Math.round((subtotal - discount) * 0.085 * 100) / 100;
  const total = subtotal - discount + tax;

  const handleQty = async (item, delta) => {
    const nextQty = Math.max(1, item.quantity + delta);
    await updateCartQty(item.raw, nextQty);
  };

  const handleRemove = async (item) => {
    setRemovingId(item.id);
    try {
      await removeCartLine(item.raw);
    } finally {
      setRemovingId("");
    }
  };

  return (
    <div className="electronics-shop-mockup min-h-screen bg-slate-50 font-sans pb-20">
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
                <Zap className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-2xl font-black text-slate-900">Electro<span className="text-blue-600">Zone</span></span>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm text-slate-500">
              <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-slate-800 font-semibold">Shopping Cart</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-slate-500"><Search className="w-5 h-5" /></Button>
              <Button variant="ghost" size="icon" className="text-slate-500"><User className="w-5 h-5" /></Button>
              <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 text-slate-800 py-2 px-4 rounded-full text-sm font-bold">
                <ShoppingCart className="w-4 h-4 text-blue-600" />
                {itemCount} items | ${subtotal.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <h1 className="text-3xl font-black text-slate-900 mb-2 flex items-center gap-3">
          Shopping Cart
          <Badge className="bg-blue-600 text-white border-none text-sm px-3 py-1 rounded-full">{itemCount}</Badge>
        </h1>
        <p className="text-slate-500 mb-8 text-sm">Review your items before checkout</p>

        {items.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="w-full lg:w-2/3 space-y-4">
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 text-xs font-bold text-slate-400 uppercase tracking-widest">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Qty</div>
                <div className="col-span-2 text-right">Price</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                {items.map((item, idx) => (
                  <div key={item.id} className={`p-5 md:p-6 flex flex-col md:grid md:grid-cols-12 gap-4 md:gap-5 items-start md:items-center ${idx > 0 ? "border-t border-slate-100" : ""} ${removingId === item.id ? "opacity-50" : ""}`}>
                    <div className="col-span-6 flex items-center gap-4 w-full">
                      <div className="w-20 h-20 rounded-xl overflow-hidden border border-slate-100 bg-slate-50 shrink-0 shadow-sm">
                        {item.img ? <img src={item.img} alt={item.name} className="w-full h-full object-cover" /> : null}
                      </div>
                      <div className="min-w-0 flex-1">
                        <Link to={`/product?id=${item.productId || ""}`} className="font-bold text-slate-900 leading-snug line-clamp-2 text-sm hover:text-blue-600 block">{item.name}</Link>
                        <p className="text-xs text-slate-400 mt-1 mb-2">{item.specs}</p>
                        <button onClick={() => handleRemove(item)} className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 font-semibold transition-colors group" disabled={isRemoving}>
                          <Trash2 className="w-3 h-3" /> Remove
                        </button>
                      </div>
                    </div>

                    <div className="col-span-2 flex justify-start md:justify-center">
                      <div className="flex items-center bg-slate-100 rounded-lg border border-slate-200 overflow-hidden">
                        <button onClick={() => handleQty(item, -1)} className="w-8 h-8 flex items-center justify-center text-slate-500 hover:bg-white hover:text-slate-900 transition-all" disabled={isUpdating}>
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-bold text-slate-900">{item.quantity}</span>
                        <button onClick={() => handleQty(item, 1)} className="w-8 h-8 flex items-center justify-center text-slate-500 hover:bg-white hover:text-slate-900 transition-all" disabled={isUpdating}>
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <div className="hidden md:block col-span-2 text-right text-sm font-medium text-slate-500">${item.price.toLocaleString()}</div>
                    <div className="col-span-2 text-right font-black text-slate-900">${(item.price * item.quantity).toLocaleString()}</div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 flex flex-col sm:flex-row items-center gap-4">
                <div className="flex items-center gap-2 text-slate-600 shrink-0">
                  <Tag className="w-5 h-5 text-blue-600" />
                  <span className="font-bold text-sm">Have a promo code?</span>
                </div>
                <div className="flex w-full gap-0">
                  <Input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="e.g. SAVE10" className="rounded-r-none h-12 bg-slate-50 border-r-0 focus-visible:ring-0 focus-visible:border-blue-500 text-sm" />
                  <Button onClick={() => { if (coupon.trim().toUpperCase() === "SAVE10") setCouponApplied(true); }} className="rounded-l-none h-12 bg-slate-900 hover:bg-blue-600 text-white px-6 font-bold shrink-0 transition-colors">
                    Apply
                  </Button>
                </div>
                {couponApplied && <span className="text-emerald-600 text-sm font-bold shrink-0">&#10003; 10% saved!</span>}
              </div>

              <button className="text-sm text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 hover:underline" onClick={() => navigate("/products")}>Continue Shopping</button>
            </div>

            <div className="w-full lg:w-1/3">
              <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sticky top-28">
                <h2 className="text-xl font-black text-slate-900 mb-5">Order Summary</h2>
                <div className="space-y-3 text-sm mb-5">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal ({itemCount} items)</span>
                    <span className="font-bold text-slate-900">${subtotal.toLocaleString()}</span>
                  </div>
                  {couponApplied && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Promo (SAVE10)</span>
                      <span>-${discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-600">
                    <span>Shipping</span>
                    <span className="font-bold text-emerald-600">FREE</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Tax (8.5%)</span>
                    <span className="font-bold text-slate-900">${tax.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 mb-6">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-base font-black text-slate-900">Total</span>
                      <p className="text-xs text-slate-400">Tax and shipping included</p>
                    </div>
                    <span className="text-3xl font-black text-blue-600">${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white h-14 rounded-xl text-base font-black shadow-xl shadow-blue-600/20 mb-3" onClick={() => navigate("/checkout")}>
                  Proceed to Checkout <ArrowRight className="w-5 h-5 ml-2" />
                </Button>

                <div className="text-center mb-5">
                  <span className="text-sm text-slate-400">or</span>
                  <button className="block mx-auto mt-2 h-10 px-6 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors text-sm font-bold text-slate-700 w-full">
                    PayPal Checkout
                  </button>
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-center gap-2.5 text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span><strong className="text-slate-700">Secure Checkout.</strong> Protected by 256-bit SSL encryption.</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <RefreshCw className="w-4 h-4 text-blue-500 shrink-0" />
                    <span><strong className="text-slate-700">Free Returns.</strong> Return within 30 days for full refund.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-16 text-center max-w-lg mx-auto">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-12 h-12 text-slate-300" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-2">Your cart is empty</h2>
            <p className="text-slate-500 mb-8">Looks like you haven't added any items yet.</p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white h-12 px-8 rounded-full font-bold" onClick={() => navigate("/products")}>Start Shopping</Button>
          </div>
        )}

        <div className="mt-16">
          <h2 className="text-2xl font-black text-slate-900 mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {recommended.map((product) => (
              <div key={product._id} className="bg-white rounded-2xl p-4 border border-slate-200 hover:shadow-xl hover:border-blue-200 transition-all group">
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-50 mb-4">
                  <Link to={`/product?id=${product._id}`} className="block h-full">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400" />
                  </Link>
                </div>
                <div className="flex items-center gap-1 mb-1.5">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-bold text-slate-600">{Number(product.rating || 0).toFixed(1)}</span>
                </div>
                <Link to={`/product?id=${product._id}`} className="block">
                  <h3 className="font-bold text-slate-900 text-sm line-clamp-2 mb-3 leading-snug">{product.name}</h3>
                </Link>
                <div className="flex items-center justify-between">
                  <span className="font-black text-blue-600">${Number(product.price || 0).toLocaleString()}</span>
                  <Button size="sm" variant="outline" className="rounded-full text-xs h-8 px-3 border-slate-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all" onClick={() => navigate(`/product?id=${product._id}`)}>
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
