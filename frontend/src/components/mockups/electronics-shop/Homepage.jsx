import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Search,
  User,
  Menu,
  ChevronRight,
  Laptop,
  Smartphone,
  Headphones,
  Gamepad2,
  Camera,
  Tv2,
  Star,
  ArrowRight,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  CreditCard,
  ShieldCheck,
  Truck,
  Heart,
  Zap,
} from "lucide-react";
import { Button, Input, Badge, Card, CardContent } from "./ui";
import { useGetProductsQuery } from "../../../redux/ApiSlices/productApiSlice";
import { useGetCategoriesQuery } from "../../../redux/ApiSlices/categoryApiSlice";
import { useMockupCartActions, useMockupCartState } from "./useMockupCart";

const categoryIcons = {
  laptops: Laptop,
  phones: Smartphone,
  audio: Headphones,
  gaming: Gamepad2,
  cameras: Camera,
  displays: Tv2,
};

export default function Homepage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 45, seconds: 30 });
  const [wishlist, setWishlist] = useState([]);
  const { itemCount } = useMockupCartState();
  const { addProductToCart, isAdding } = useMockupCartActions();

  const { data: productsData } = useGetProductsQuery();
  const { data: categoriesData } = useGetCategoriesQuery();

  const products = productsData?.products || [];
  const categories = categoriesData?.categories || [];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const featuredProducts = useMemo(() => {
    const featured = products.filter((product) => product.isFeatured);
    return (featured.length ? featured : products).slice(0, 6);
  }, [products]);

  const heroProduct = featuredProducts[0];

  const categoryCards = useMemo(() => {
    const counts = products.reduce((acc, product) => {
      const slug = product.category?.slug;
      if (!slug) return acc;
      acc[slug] = (acc[slug] || 0) + 1;
      return acc;
    }, {});

    return categories.map((category) => ({
      ...category,
      count: counts[category.slug] || 0,
      Icon: categoryIcons[category.slug] || Laptop,
    }));
  }, [categories, products]);

  const avgRating = useMemo(() => {
    if (!products.length) return "4.9";
    const total = products.reduce((sum, product) => sum + Number(product.rating || 0), 0);
    return (total / products.length).toFixed(1);
  }, [products]);

  const fmt = (n) => n.toString().padStart(2, "0");
  const toggleWish = (id) =>
    setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]));
  const submitSearch = (event) => {
    if (event?.preventDefault) event.preventDefault();
    const value = searchQuery.trim();
    navigate(value ? `/products?search=${encodeURIComponent(value)}` : "/products");
  };
  const handleAddToCart = async (product) => {
    await addProductToCart(product);
  };

  return (
    <div className="electronics-shop-mockup min-h-screen bg-slate-950 text-slate-50 font-sans">
      <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
                <Zap className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Electro<span className="text-blue-400">Zone</span>
              </span>
            </div>

            <form className="hidden md:flex flex-1 max-w-2xl mx-8" onSubmit={submitSearch}>
              <div className="w-full flex bg-slate-900 border border-slate-700 rounded-full overflow-hidden focus-within:border-blue-500 transition-colors">
                <Input
                  type="search"
                  placeholder="Search laptops, phones, audio..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="flex-1 bg-transparent border-none text-white placeholder:text-slate-500 focus-visible:ring-0 h-12 pl-5"
                />
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 rounded-full m-1 h-10 px-5 shrink-0">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </form>

            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="text-slate-300 hover:text-white hover:bg-slate-800 hidden sm:flex">
                <User className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="relative text-slate-300 hover:text-white hover:bg-slate-800" onClick={() => navigate("/cart")}>
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-0.5 -right-0.5 min-w-5 h-5 px-1 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{itemCount}</span>
              </Button>
              <Button variant="ghost" size="icon" className="md:hidden text-slate-300">
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 h-11 text-sm font-medium border-t border-slate-800/50">
            {["All Categories", "Laptops", "Phones", "Audio", "Gaming", "Cameras", "Displays"].map((item, index) => (
              <button
                key={item}
                type="button"
                onClick={() => navigate(index === 0 ? "/products" : `/products?category=${item.toLowerCase()}`)}
                className={`hover:text-blue-400 transition-colors ${index === 0 ? "text-slate-300 flex items-center gap-1.5" : "text-slate-400"}`}
              >
                {index === 0 && <Menu className="w-4 h-4" />}
                {item}
              </button>
            ))}
            <button type="button" onClick={() => navigate("/products")} className="text-red-400 hover:text-red-300 ml-auto font-semibold animate-pulse">
              Flash Deals
            </button>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950/30 to-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(37,99,235,0.15)_0%,_transparent_60%)]" />
        <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-7">
              <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/30 px-4 py-1.5 text-sm font-semibold rounded-full">
                New Arrivals - Spring 2026
              </Badge>
              <h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-[1.05]">
                Next-Gen Tech,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500">
                  Unbeatable
                  <br />
                  Prices
                </span>
              </h1>
              <p className="text-lg text-slate-400 max-w-lg leading-relaxed">
                Discover thousands of premium electronics - from pro laptops to flagship audio and mobile devices. Free shipping on orders over $49.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-blue-600 hover:bg-blue-500 text-white h-13 px-8 rounded-full text-base font-bold shadow-xl shadow-blue-600/30 transition-all hover:scale-105" onClick={() => navigate("/products")}>
                  Shop Now <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="outline" className="border-slate-600 text-slate-200 hover:bg-slate-800 hover:border-slate-500 h-13 px-8 rounded-full text-base bg-transparent" onClick={() => navigate("/products")}>
                  View All Deals
                </Button>
              </div>
              <div className="flex gap-8 pt-2">
                {[["50K+", "Customers"], [`${avgRating}/5`, "Rating"], ["Free", "Shipping"]].map(([value, label]) => (
                  <div key={label}>
                    <div className="text-2xl font-black text-white">{value}</div>
                    <div className="text-sm text-slate-500">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-blue-600/10 rounded-3xl blur-2xl" />
              <div className="relative rounded-3xl overflow-hidden border border-slate-700/50 shadow-2xl shadow-blue-900/30">
                <img src="/mockups/electronics-shop/images/hero-banner.png" alt="ElectroZone Premium Tech" className="w-full h-[400px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                {heroProduct ? (
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-slate-950/80 backdrop-blur-md rounded-2xl p-4 border border-slate-700/50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-slate-400 mb-0.5">Featured Product</p>
                          <p className="font-bold text-white">{heroProduct.name}</p>
                        </div>
                        <div className="text-right">
                          {heroProduct.originalPrice > heroProduct.price ? (
                            <p className="text-xs text-slate-500 line-through">${Number(heroProduct.originalPrice).toLocaleString()}</p>
                          ) : null}
                          <p className="text-lg font-black text-blue-400">${Number(heroProduct.price).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 bg-gradient-to-r from-red-950/40 via-slate-900 to-red-950/40 border-y border-red-900/30">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-red-500/15 flex items-center justify-center text-3xl border border-red-500/20">!</div>
            <div>
              <h2 className="text-2xl font-black text-white">Flash Sale - Up to 40% Off</h2>
              <p className="text-slate-400 text-sm">Exclusive deals on top-rated electronics. Today only.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-slate-400 text-sm font-medium">Ends in:</span>
            <div className="flex gap-2">
              {[["Hours", fmt(timeLeft.hours)], ["Mins", fmt(timeLeft.minutes)], ["Secs", fmt(timeLeft.seconds)]].map(([label, val], index) => (
                <React.Fragment key={label}>
                  {index > 0 && <div className="text-2xl font-black text-red-500 self-center leading-none">:</div>}
                  <div className="bg-slate-800 border border-slate-700 rounded-xl w-16 h-16 flex flex-col items-center justify-center shadow-lg">
                    <span className={`text-xl font-black leading-none ${index === 2 ? "text-red-400" : "text-white"}`}>{val}</span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">{label}</span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          <Button className="bg-red-600 hover:bg-red-500 text-white px-8 h-12 rounded-full font-bold shadow-lg shadow-red-600/20" onClick={() => navigate("/products")}>
            See All Deals <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-2">Browse</p>
            <h2 className="text-3xl font-black text-white">Shop by Category</h2>
          </div>
          <Button variant="ghost" className="text-slate-400 hover:text-white hidden md:flex" onClick={() => navigate("/products")}>
            View All <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categoryCards.map(({ _id, name, slug, count, Icon }) => (
            <button key={_id} type="button" onClick={() => navigate(`/products?category=${slug}`)} className="group block text-left">
              <Card className="bg-slate-900/60 border-slate-800 hover:border-blue-500/60 hover:bg-slate-800/80 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20">
                <CardContent className="p-5 flex flex-col items-center text-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-slate-800 group-hover:bg-blue-600/20 transition-colors flex items-center justify-center text-slate-300 group-hover:text-blue-400 border border-slate-700 group-hover:border-blue-500/30">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-200 group-hover:text-white text-sm">{name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{count} items</p>
                  </div>
                </CardContent>
              </Card>
            </button>
          ))}
        </div>
      </section>

      <section className="py-12 container mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-2">Top Picks</p>
            <h2 className="text-3xl font-black text-white">Featured Products</h2>
          </div>
          <Button variant="outline" className="border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 rounded-full px-6" onClick={() => navigate("/products")}>
            View All
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <Card key={product._id} className="bg-slate-900 border-slate-800 overflow-hidden hover:border-slate-600 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300 group">
              <div className="relative h-56 overflow-hidden bg-slate-800">
                <Link to={`/product?id=${product._id}`} className="block h-full">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </Link>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                {Number(product.originalPrice) > Number(product.price) ? (
                  <Badge className="absolute top-3 left-3 bg-red-500 text-white border-none font-bold shadow-lg">
                    -{Math.round((1 - Number(product.price) / Number(product.originalPrice)) * 100)}%
                  </Badge>
                ) : null}
                {product.brand ? (
                  <Badge className="absolute top-3 left-24 bg-slate-900/80 backdrop-blur text-slate-200 border-slate-700 text-xs">
                    {product.brand}
                  </Badge>
                ) : null}
                <button
                  onClick={() => toggleWish(product._id)}
                  className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-lg ${wishlist.includes(product._id) ? "bg-red-500 text-white" : "bg-slate-900/70 backdrop-blur-sm text-slate-300 hover:bg-red-500 hover:text-white"}`}
                >
                  <Heart className="w-4 h-4" fill={wishlist.includes(product._id) ? "currentColor" : "none"} />
                </button>
              </div>

              <CardContent className="p-5">
                <div className="flex items-center gap-1.5 mb-2">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-bold text-white">{Number(product.rating || 0).toFixed(1)}</span>
                  <span className="text-sm text-slate-500">({Number(product.numReviews || 0).toLocaleString()})</span>
                </div>
                <Link to={`/product?id=${product._id}`} className="block">
                  <h3 className="font-bold text-slate-100 mb-3 line-clamp-1 group-hover:text-white">{product.name}</h3>
                </Link>
                <div className="flex items-center justify-between">
                  <div>
                    {Number(product.originalPrice) > Number(product.price) ? (
                      <span className="text-xs text-slate-500 line-through mr-2">${Number(product.originalPrice).toLocaleString()}</span>
                    ) : null}
                    <span className="text-xl font-black text-blue-400">${Number(product.price).toLocaleString()}</span>
                  </div>
                  <Button
                    className="bg-blue-600 hover:bg-blue-500 text-white rounded-full h-9 px-4 text-sm font-bold shadow-md shadow-blue-600/20"
                    onClick={() => handleAddToCart(product)}
                    disabled={isAdding}
                  >
                    Add <ShoppingCart className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-12 container mx-auto px-4">
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 rounded-3xl p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-indigo-900/20 rounded-full translate-y-1/2" />
          <div className="relative z-10 max-w-lg">
            <Badge className="bg-white/20 text-white border-white/20 mb-4 px-4 py-1.5 rounded-full font-semibold">
              Limited Time Offer
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-black text-white mb-3">Free Shipping on All Orders Over $49</h2>
            <p className="text-blue-100 text-lg mb-6">Plus 60-day hassle-free returns on all electronics. Shop with confidence.</p>
            <Button className="bg-white text-blue-700 hover:bg-blue-50 h-13 px-8 rounded-full text-base font-black shadow-xl" onClick={() => navigate("/products")}>
              Shop Eligible Items <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <div className="relative z-10 hidden lg:flex gap-5">
            {[[Truck, "Free Delivery", "On $49+"], [ShieldCheck, "Secure Pay", "256-bit SSL"], [CreditCard, "Buy Now,\nPay Later", "0% interest"]].map(([Icon, title, sub]) => (
              <div key={String(title)} className="w-28 h-28 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center text-white gap-2 text-center p-3">
                {React.createElement(Icon, { className: "w-7 h-7" })}
                <span className="text-[11px] font-bold leading-tight">{String(title)}</span>
                <span className="text-[9px] text-blue-100">{String(sub)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-slate-800 bg-slate-900/30">
        <div className="container mx-auto px-4 text-center max-w-xl">
          <div className="w-16 h-16 mx-auto bg-blue-600/15 rounded-full flex items-center justify-center mb-6 border border-blue-500/20">
            <Mail className="w-7 h-7 text-blue-400" />
          </div>
          <h2 className="text-3xl font-black text-white mb-3">Stay in the Loop</h2>
          <p className="text-slate-400 mb-8">Get exclusive deals, new arrivals, and tech news - weekly.</p>
          <form className="flex gap-2 max-w-md mx-auto" onSubmit={(event) => event.preventDefault()}>
            <Input type="email" placeholder="your@email.com" required className="flex-1 bg-slate-800 border-slate-700 text-white h-12 focus-visible:ring-blue-500 placeholder:text-slate-500" />
            <Button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white h-12 px-6 font-bold shrink-0">
              Subscribe
            </Button>
          </form>
          <p className="text-slate-600 text-xs mt-4">No spam. Unsubscribe anytime.</p>
        </div>
      </section>

      <footer className="bg-slate-950 border-t border-slate-800 pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            <div className="lg:col-span-2 space-y-5">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white fill-white" />
                </div>
                <span className="text-2xl font-black text-white">Electro<span className="text-blue-400">Zone</span></span>
              </div>
              <p className="text-slate-500 max-w-sm text-sm leading-relaxed">
                The ultimate destination for premium electronics. Cutting-edge tech with unmatched customer service since 2015.
              </p>
              <div className="flex gap-3">
                {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                  <a key={index} href="#" className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500 hover:bg-blue-600/10 flex items-center justify-center text-slate-400 hover:text-blue-400 transition-all">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
            {[
              ["Shop", ["Laptops & PCs", "Smartphones", "Audio & Headphones", "Gaming", "Accessories"]],
              ["Support", ["Contact Us", "FAQs", "Shipping & Returns", "Track Order", "Warranty"]],
              ["Company", ["About Us", "Careers", "Privacy Policy", "Terms", "Affiliates"]],
            ].map(([title, links]) => (
              <div key={String(title)}>
                <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">{String(title)}</h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-slate-500 hover:text-blue-400 transition-colors text-sm">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-600 text-sm">&copy; 2026 ElectroZone. All rights reserved.</p>
            <div className="flex items-center gap-2">
              {["VISA", "MC", "AMEX", "PayPal", "ApplePay"].map((provider) => (
                <div key={provider} className="h-7 px-2.5 bg-slate-800 rounded border border-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-400">
                  {provider}
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
