import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  ShoppingCart,
  Search,
  User,
  ChevronRight,
  Star,
  Heart,
  Filter,
  Grid3x3,
  List,
  X,
  Zap,
  SlidersHorizontal,
} from "lucide-react";
import { Button, Input, Badge, Card, CardContent } from "./ui";
import { useGetProductsQuery } from "../../../redux/ApiSlices/productApiSlice";
import { useGetCategoriesQuery } from "../../../redux/ApiSlices/categoryApiSlice";
import { useMockupCartActions, useMockupCartState } from "./useMockupCart";

export default function ProductListing() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeSearch = searchParams.get("search")?.trim() || "";
  const activeCategory = searchParams.get("category")?.trim() || "";

  const { data: productsData, isFetching } = useGetProductsQuery(
    activeSearch ? { keyword: activeSearch } : {},
  );
  const { data: categoriesData } = useGetCategoriesQuery();
  const { itemCount } = useMockupCartState();
  const { addProductToCart, isAdding } = useMockupCartActions();

  const products = productsData?.products || [];
  const categories = categoriesData?.categories || [];

  const [view, setView] = useState("grid");
  const [maxPrice, setMaxPrice] = useState(5000);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [sort, setSort] = useState("featured");
  const [searchInput, setSearchInput] = useState(activeSearch);

  useEffect(() => {
    setSearchInput(activeSearch);
  }, [activeSearch]);

  const normalizedProducts = useMemo(
    () =>
      products.map((product) => ({
        id: product._id,
        name: product.name || "Unnamed product",
        brand: product.brand || product.category?.name || "Product",
        categorySlug: product.category?.slug || "",
        price: Number(product.price || 0),
        originalPrice: Number(product.originalPrice || product.price || 0),
        rating: Number(product.rating || 0),
        reviews: Number(product.numReviews || 0),
        img: product.image || "",
        isFeatured: Boolean(product.isFeatured),
      })),
    [products],
  );

  const availableBrands = useMemo(
    () => [...new Set(normalizedProducts.map((product) => product.brand).filter(Boolean))],
    [normalizedProducts],
  );

  const filtered = useMemo(() => {
    let result = normalizedProducts.filter((product) => {
      const matchesCategory = !activeCategory || product.categorySlug === activeCategory;
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const matchesPrice = product.price <= maxPrice;
      return matchesCategory && matchesBrand && matchesPrice;
    });

    switch (sort) {
      case "price-low":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result = [...result].reverse();
        break;
      default:
        result = [...result].sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
        break;
    }

    return result;
  }, [activeCategory, maxPrice, normalizedProducts, selectedBrands, sort]);

  const activeCategoryLabel =
    categories.find((category) => category.slug === activeCategory)?.name || "Laptops & Notebooks";

  const toggleBrand = (brand) =>
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((item) => item !== brand) : [...prev, brand],
    );
  const toggleWish = (id) =>
    setWishlist((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));

  const submitSearch = (event) => {
    event.preventDefault();
    const next = {};
    const value = searchInput.trim();
    if (value) next.search = value;
    if (activeCategory) next.category = activeCategory;
    setSearchParams(next);
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setMaxPrice(5000);
  };
  const handleAddToCart = async (productId) => {
    const product = products.find((entry) => entry._id === productId);
    if (!product) return;
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
              <span className="text-2xl font-black text-white">Electro<span className="text-blue-400">Zone</span></span>
            </div>
            <form className="hidden md:flex flex-1 max-w-xl mx-8" onSubmit={submitSearch}>
              <div className="w-full flex bg-slate-900 border border-slate-700 rounded-full overflow-hidden focus-within:border-blue-500 transition-colors">
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={searchInput}
                  onChange={(event) => setSearchInput(event.target.value)}
                  className="flex-1 bg-transparent border-none text-white placeholder:text-slate-500 focus-visible:ring-0 h-11 pl-5"
                />
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 rounded-full m-1 h-9 px-4 shrink-0">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </form>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="text-slate-300 hover:text-white hover:bg-slate-800 hidden sm:flex"><User className="w-5 h-5" /></Button>
              <Button variant="ghost" size="icon" className="relative text-slate-300 hover:text-white hover:bg-slate-800" onClick={() => navigate("/cart")}>
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-0.5 -right-0.5 min-w-5 h-5 px-1 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{itemCount}</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-slate-900 border-b border-slate-800 py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-slate-500 mb-3 gap-1">
            <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            {activeCategory ? (
              <>
                <Link to="/products" className="hover:text-blue-400 transition-colors">Categories</Link>
                <ChevronRight className="w-4 h-4" />
              </>
            ) : null}
            <span className="text-slate-300 font-medium">
              {activeSearch ? `Search: ${activeSearch}` : activeCategoryLabel}
            </span>
          </div>
          <h1 className="text-3xl font-black text-white">
            {activeSearch ? `Search Results for "${activeSearch}"` : activeCategoryLabel}
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            {isFetching
              ? "Searching products..."
              : `Showing ${filtered.length} product${filtered.length === 1 ? "" : "s"} in the live catalog.`}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sticky top-28 space-y-7">
              <div className="flex items-center justify-between">
                <h2 className="font-black text-white flex items-center gap-2"><Filter className="w-4 h-4 text-blue-400" /> Filters</h2>
                <button onClick={clearFilters} className="text-xs text-blue-400 hover:text-blue-300">Reset</button>
              </div>

              <div className="space-y-3 border-t border-slate-800 pt-5">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-slate-200 text-sm">Max Price</h3>
                  <span className="text-blue-400 font-bold text-sm">${maxPrice.toLocaleString()}</span>
                </div>
                <input type="range" min={200} max={5000} step={100} value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} className="w-full h-1.5 rounded-full bg-slate-700 appearance-none cursor-pointer accent-blue-500" />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>$200</span><span>$5,000</span>
                </div>
              </div>

              <div className="space-y-3 border-t border-slate-800 pt-5">
                <h3 className="font-bold text-slate-200 text-sm">Brand</h3>
                {availableBrands.map((brand) => (
                  <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                    <div onClick={() => toggleBrand(brand)} className={`w-4 h-4 rounded border flex items-center justify-center transition-all cursor-pointer ${selectedBrands.includes(brand) ? "bg-blue-600 border-blue-600" : "border-slate-600 group-hover:border-slate-400"}`}>
                      {selectedBrands.includes(brand) && <span className="text-white text-[10px] font-black">&#10003;</span>}
                    </div>
                    <span className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors">{brand}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          <main className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
              <span className="text-sm text-slate-400">
                Showing <strong className="text-white">{filtered.length}</strong> of <strong className="text-white">{normalizedProducts.length}</strong> results
              </span>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-slate-500" />
                  <select value={sort} onChange={(event) => setSort(event.target.value)} className="bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500">
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest</option>
                  </select>
                </div>
                <div className="flex items-center bg-slate-800 rounded-lg p-1 border border-slate-700">
                  <button onClick={() => setView("grid")} className={`p-2 rounded-md transition-colors ${view === "grid" ? "bg-blue-600 text-white shadow" : "text-slate-500 hover:text-white"}`}>
                    <Grid3x3 className="w-4 h-4" />
                  </button>
                  <button onClick={() => setView("list")} className={`p-2 rounded-md transition-colors ${view === "list" ? "bg-blue-600 text-white shadow" : "text-slate-500 hover:text-white"}`}>
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {selectedBrands.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {selectedBrands.map((brand) => (
                  <Badge key={brand} className="bg-blue-600/15 text-blue-400 border border-blue-500/30 py-1.5 px-3 flex items-center gap-1.5 hover:bg-blue-600/20">
                    {brand}
                    <button onClick={() => toggleBrand(brand)}><X className="w-3 h-3" /></button>
                  </Badge>
                ))}
                <button onClick={() => setSelectedBrands([])} className="text-sm text-slate-500 hover:text-red-400 px-2">Clear All</button>
              </div>
            )}

            {!isFetching && filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 p-10 text-center text-sm text-slate-400">
                No products matched the current search and filters.
              </div>
            ) : null}

            <div className={`grid gap-5 ${view === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}>
              {filtered.map((product) => (
                <Card key={product.id} className={`relative bg-slate-900 border-slate-800 overflow-hidden hover:border-slate-600 hover:shadow-xl hover:shadow-blue-900/10 transition-all duration-300 group ${view === "list" ? "flex flex-row" : ""}`}>
                  <div className={`relative overflow-hidden bg-slate-800 ${view === "list" ? "w-48 shrink-0" : "h-52"}`}>
                    <Link to={`/product?id=${product.id}`} className="block h-full">
                      <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </Link>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
                    {product.originalPrice > product.price && (
                      <Badge className="absolute top-2 left-2 bg-red-500 text-white border-none font-bold text-xs shadow">
                        -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                      </Badge>
                    )}
                    <Badge className="absolute top-2 right-10 bg-slate-900/80 backdrop-blur text-slate-300 border-slate-700 text-xs">{product.brand}</Badge>
                    <button
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWish(product.id); }}
                      className={`absolute z-10 top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow ${wishlist.includes(product.id) ? "bg-red-500 text-white" : "bg-slate-900/70 backdrop-blur text-slate-400 hover:bg-red-500 hover:text-white"}`}
                    >
                      <Heart className="w-4 h-4" fill={wishlist.includes(product.id) ? "currentColor" : "none"} />
                    </button>
                  </div>

                  <CardContent className={`p-5 flex flex-col ${view === "list" ? "flex-1" : ""}`}>
                    <div className="flex items-center gap-1.5 mb-2">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-bold text-white">{product.rating.toFixed(1)}</span>
                      <span className="text-xs text-slate-500">({product.reviews.toLocaleString()} reviews)</span>
                    </div>
                    <Link to={`/product?id=${product.id}`} className="block flex-1 after:absolute after:inset-0 after:z-0">
                      <h3 className="font-bold text-slate-100 mb-3 line-clamp-2 leading-snug group-hover:text-white">{product.name}</h3>
                    </Link>
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-800">
                      <div>
                        {product.originalPrice > product.price && <div className="text-xs text-slate-600 line-through">${product.originalPrice.toLocaleString()}</div>}
                        <div className="text-xl font-black text-blue-400">${product.price.toLocaleString()}</div>
                      </div>
                      <Button
                        className="relative z-10 bg-blue-600 hover:bg-blue-500 text-white rounded-full h-9 px-4 text-sm font-bold shadow-md shadow-blue-600/20"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAddToCart(product.id); }}
                        disabled={isAdding}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
