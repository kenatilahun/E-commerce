import React, { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  ShoppingCart,
  Search,
  User,
  ChevronRight,
  Star,
  Heart,
  ShieldCheck,
  Truck,
  RefreshCw,
  Minus,
  Plus,
  Share2,
  CheckCircle2,
  Zap,
} from "lucide-react";
import { Button, Input, Badge } from "./ui";
import { useGetProductByIdQuery, useGetProductsQuery } from "../../../redux/ApiSlices/productApiSlice";
import { useMockupCartActions, useMockupCartState } from "./useMockupCart";

const reviews = [
  { name: "Alex M.", rating: 5, date: "Mar 15, 2026", text: "Absolutely incredible machine. Performance is exactly what I wanted and the finish feels premium.", avatar: "AM" },
  { name: "Sarah K.", rating: 5, date: "Mar 10, 2026", text: "Great battery life, beautiful display, and the product matched the photos perfectly.", avatar: "SK" },
  { name: "David L.", rating: 4, date: "Mar 5, 2026", text: "Very strong product overall. The value is there if you want a polished premium setup.", avatar: "DL" },
];

export default function ProductDetail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("id") || "";

  const { data: productsData } = useGetProductsQuery();
  const catalog = productsData?.products || [];
  const { itemCount } = useMockupCartState();
  const { addProductToCart, isAdding } = useMockupCartActions();
  const fallbackProductId = catalog[0]?._id || "";
  const resolvedProductId = productId || fallbackProductId;

  const { data: product, isFetching } = useGetProductByIdQuery(resolvedProductId, {
    skip: !resolvedProductId,
  });

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [wishlisted, setWishlisted] = useState(false);

  const tabs = ["description", "specifications", "reviews", "qa"];
  const tabLabels = {
    description: "Description",
    specifications: "Specifications",
    reviews: `Reviews (${Number(product?.numReviews || 0).toLocaleString()})`,
    qa: "Q&A",
  };

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return catalog
      .filter((item) => item._id !== product._id)
      .filter((item) => item.category?.slug === product.category?.slug || item.isRecommended)
      .slice(0, 4);
  }, [catalog, product]);

  const trustItems = [
    { Icon: Truck, title: "Free Shipping", sub: "On orders over $49", wrapper: "bg-emerald-50", icon: "text-emerald-600" },
    { Icon: RefreshCw, title: "Easy Returns", sub: "30-day policy", wrapper: "bg-blue-50", icon: "text-blue-600" },
    { Icon: ShieldCheck, title: "2-Year Warranty", sub: "Full coverage", wrapper: "bg-purple-50", icon: "text-purple-600" },
  ];

  const specs = [
    ["Brand", product?.brand || "ElectroZone"],
    ["Category", product?.category?.name || "Electronics"],
    ["Stock", typeof product?.countInStock === "number" ? `${product.countInStock} units` : "Available"],
    ["Rating", `${Number(product?.rating || 0).toFixed(1)} / 5`],
    ["Reviews", Number(product?.numReviews || 0).toLocaleString()],
    ["Featured", product?.isFeatured ? "Yes" : "No"],
  ];
  const handleAddToCart = async (targetProduct = product, targetQty = quantity) => {
    if (!targetProduct) return;
    await addProductToCart(targetProduct, { qty: targetQty });
  };
  const handleBuyNow = async () => {
    if (!product) return;
    await addProductToCart(product, { qty: quantity });
    navigate("/checkout");
  };

  if (!resolvedProductId || (!product && !isFetching)) {
    return (
      <div className="electronics-shop-mockup min-h-screen bg-slate-50 text-slate-900 font-sans flex items-center justify-center px-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm max-w-lg">
          <h1 className="text-2xl font-black text-slate-900">Product not found</h1>
          <p className="mt-3 text-sm text-slate-500">The selected product is missing from the current catalog.</p>
          <Button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6" onClick={() => navigate("/products")}>
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="electronics-shop-mockup min-h-screen bg-slate-50 text-slate-900 font-sans">
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
                <Zap className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-2xl font-black text-slate-900">Electro<span className="text-blue-600">Zone</span></span>
            </div>
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <div className="w-full flex bg-slate-100 border border-slate-200 rounded-full overflow-hidden focus-within:border-blue-500 transition-colors">
                <Input type="search" placeholder="Search products..." className="flex-1 bg-transparent border-none text-slate-900 placeholder:text-slate-400 focus-visible:ring-0 h-11 pl-5" />
                <Button className="bg-blue-600 hover:bg-blue-700 rounded-full m-1 h-9 px-4 shrink-0" onClick={() => navigate("/products")}>
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900 hidden sm:flex"><User className="w-5 h-5" /></Button>
              <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-slate-900" onClick={() => navigate("/cart")}>
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-0.5 -right-0.5 min-w-5 h-5 px-1 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{itemCount}</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-4 flex items-center text-sm text-slate-400 gap-1">
        <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to={`/products?category=${product?.category?.slug || ""}`} className="hover:text-blue-600 transition-colors">
          {product?.category?.name || "Products"}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-800 font-semibold">{product?.name || "Loading..."}</span>
      </div>

      <div className="container mx-auto px-4 py-6 pb-16">
        <div className="bg-white rounded-3xl p-6 lg:p-10 shadow-sm border border-slate-200">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 aspect-[4/3] group">
                {product?.image ? (
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-sm text-slate-400">No image available</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product?.brand ? <Badge className="bg-blue-600 text-white border-none shadow-lg">{product.brand}</Badge> : null}
                  <Badge className="bg-emerald-500 text-white border-none shadow-md flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> {product?.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <button onClick={() => setWishlisted((value) => !value)} className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all ${wishlisted ? "bg-red-500 text-white" : "bg-white text-slate-400 hover:bg-red-500 hover:text-white"}`}>
                    <Heart className="w-5 h-5" fill={wishlisted ? "currentColor" : "none"} />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md text-slate-400 hover:text-blue-600 transition-all">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <div className="aspect-[4/3] rounded-xl overflow-hidden border-2 border-blue-600 shadow-md shadow-blue-600/10 bg-slate-50">
                  {product?.image ? <img src={product.image} alt={product.name} className="w-full h-full object-cover" /> : null}
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <h1 className="text-3xl lg:text-4xl font-black text-slate-900 mb-3 leading-tight">{product?.name}</h1>
              <div className="flex items-center gap-4 mb-5">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className={`w-4 h-4 ${star <= Math.round(Number(product?.rating || 0)) ? "fill-amber-400 text-amber-400" : "fill-amber-400 text-amber-400 opacity-40"}`} />
                  ))}
                  <span className="ml-1.5 font-bold text-slate-700 text-sm">{Number(product?.rating || 0).toFixed(1)}</span>
                </div>
                <span className="text-slate-300">|</span>
                <span className="text-blue-600 text-sm font-semibold">{Number(product?.numReviews || 0).toLocaleString()} Reviews</span>
                <span className="text-slate-300">|</span>
                <span className="text-slate-400 text-sm">SKU: {String(product?._id || "").slice(-8).toUpperCase()}</span>
              </div>

              <div className="bg-blue-50 rounded-2xl p-5 mb-6 border border-blue-100">
                <div className="flex items-end gap-3 mb-1">
                  <span className="text-4xl font-black text-slate-900">${Number(product?.price || 0).toLocaleString()}</span>
                  {Number(product?.originalPrice || 0) > Number(product?.price || 0) ? <span className="text-lg text-slate-400 line-through mb-1">${Number(product.originalPrice).toLocaleString()}</span> : null}
                </div>
                {Number(product?.originalPrice || 0) > Number(product?.price || 0) ? (
                  <p className="text-red-600 font-bold text-sm flex items-center gap-1">
                    Save ${(Number(product.originalPrice) - Number(product.price)).toLocaleString()} - {Math.round((1 - Number(product.price) / Number(product.originalPrice)) * 100)}% off
                  </p>
                ) : null}
              </div>

              <div className="space-y-5 mb-7 flex-1">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="font-bold text-slate-900 text-sm mb-3">Product Summary</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {product?.description || "This product does not have a detailed description yet."}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="flex items-center bg-slate-100 rounded-xl border border-slate-200 p-1">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center text-slate-500 hover:bg-white hover:shadow-sm rounded-lg transition-all">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-bold">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center text-slate-500 hover:bg-white hover:shadow-sm rounded-lg transition-all">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-14 rounded-xl text-base font-black shadow-xl shadow-blue-600/20" onClick={handleAddToCart} disabled={isAdding}>
                    <ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart
                  </Button>
                </div>
                <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white h-14 rounded-xl text-base font-black" onClick={handleBuyNow} disabled={isAdding}>Buy it Now</Button>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-7 pt-7 border-t border-slate-100">
                {trustItems.map(({ Icon, title, sub, wrapper, icon }) => (
                  <div key={title} className="flex flex-col items-center text-center gap-2">
                    <div className={`w-10 h-10 rounded-full ${wrapper} flex items-center justify-center ${icon}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">{title}</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="flex border-b border-slate-200 px-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-4 text-sm font-bold whitespace-nowrap transition-all border-b-2 ${activeTab === tab ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-900"}`}>
                {tabLabels[tab]}
              </button>
            ))}
          </div>

          <div className="p-8">
            {activeTab === "description" && (
              <div className="max-w-3xl space-y-6">
                <h3 className="text-2xl font-black text-slate-900">Designed to match the ElectroZone storefront</h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                  {product?.description || "Detailed product storytelling will appear here as the catalog grows."}
                </p>
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="max-w-3xl">
                <h3 className="text-xl font-black text-slate-900 mb-5">Technical Specifications</h3>
                <div className="border border-slate-200 rounded-2xl overflow-hidden">
                  <table className="w-full text-sm">
                    <tbody className="divide-y divide-slate-100">
                      {specs.map(([label, value], index) => (
                        <tr key={label} className={index % 2 === 0 ? "bg-slate-50/50" : "bg-white"}>
                          <th className="py-4 px-5 font-bold text-slate-900 text-left w-1/3 text-sm">{label}</th>
                          <td className="py-4 px-5 text-slate-600">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="max-w-3xl space-y-5">
                <div className="flex items-center gap-6 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="text-center">
                    <div className="text-5xl font-black text-slate-900">{Number(product?.rating || 0).toFixed(1)}</div>
                    <div className="flex justify-center mt-1">
                      {[1, 2, 3, 4, 5].map((star) => <Star key={star} className={`w-4 h-4 ${star <= Math.round(Number(product?.rating || 0)) ? "fill-amber-400 text-amber-400" : "fill-amber-400 text-amber-400 opacity-40"}`} />)}
                    </div>
                    <div className="text-sm text-slate-500 mt-1">{Number(product?.numReviews || 0).toLocaleString()} reviews</div>
                  </div>
                </div>
                {reviews.map((review, index) => (
                  <div key={index} className="p-5 border border-slate-200 rounded-2xl">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">{review.avatar}</div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{review.name}</div>
                        <div className="text-xs text-slate-400">{review.date}</div>
                      </div>
                      <div className="ml-auto flex">
                        {[1, 2, 3, 4, 5].map((star) => <Star key={star} className={`w-3.5 h-3.5 ${star <= review.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"}`} />)}
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">{review.text}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "qa" && (
              <div className="max-w-3xl space-y-4">
                {[
                  ["Is this product currently available?", product?.countInStock > 0 ? "Yes, it is currently in stock and ready to ship." : "This item is currently out of stock."],
                  ["Does the listing use live catalog data?", "Yes. This page is now powered by the real product catalog rather than the old mock array."],
                  ["Will more specifications be added later?", "Yes. The product model can be extended further as we deepen the live storefront experience."],
                ].map(([question, answer], index) => (
                  <div key={index} className="p-5 border border-slate-200 rounded-2xl">
                    <p className="font-bold text-slate-900 text-sm mb-2">Q: {question}</p>
                    <p className="text-slate-600 text-sm leading-relaxed">A: {answer}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-black text-slate-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedProducts.map((item) => (
              <div key={item._id} className="bg-white rounded-2xl p-4 border border-slate-200 hover:shadow-lg hover:border-blue-200 transition-all group">
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-50 mb-4">
                  <Link to={`/product?id=${item._id}`} className="block h-full">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400" />
                  </Link>
                </div>
                <div className="flex items-center gap-1 mb-1.5">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-bold text-slate-700">{Number(item.rating || 0).toFixed(1)}</span>
                </div>
                <Link to={`/product?id=${item._id}`} className="block">
                  <h3 className="font-bold text-slate-900 text-sm line-clamp-2 mb-3 leading-snug">{item.name}</h3>
                </Link>
                <div className="flex justify-between items-center">
                  <span className="font-black text-blue-600">${Number(item.price || 0).toLocaleString()}</span>
                  <button className="w-8 h-8 rounded-full bg-slate-100 hover:bg-blue-600 hover:text-white flex items-center justify-center text-slate-600 transition-all" onClick={() => handleAddToCart(item)}>
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
