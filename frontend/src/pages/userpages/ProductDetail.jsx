import React, { useMemo, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductByIdQuery } from "../../redux/ApiSlices/productApiSlice";
import { useAddCartItemMutation } from "../../redux/ApiSlices/cartApiSlice";
import { addItem as addGuestItem } from "../../redux/featureSlices/cartSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);
  const mockProductsById = {
    p1: {
      _id: "p1",
      name: "Nova Ultra 6.7 Smartphone",
      price: 899,
      rating: 4.8,
      numReviews: 1642,
      brand: "Nova",
      countInStock: 7,
      description: "Flagship-grade smartphone with a pro camera system, ultra-bright display, and all-day battery life.",
      image: "/images/mock/smartphone-1.jpg",
      images: ["/images/mock/smartphone-1.jpg"],
      category: { name: "Smartphones", slug: "smartphones" },
    },
    p2: {
      _id: "p2",
      name: "Nimbus Pro 14 Laptop",
      price: 1249,
      rating: 4.7,
      numReviews: 1248,
      brand: "Nimbus",
      countInStock: 5,
      description: "Ultra-light performance laptop with a stunning display and all-day productivity battery.",
      image: "/images/mock/laptop-1.jpg",
      images: ["/images/mock/laptop-1.jpg"],
      category: { name: "Laptops", slug: "laptops" },
    },
  };
  const mockProduct = !isObjectId ? mockProductsById[id] : null;
  const { data: apiProduct, isLoading, isError, error, refetch } = useGetProductByIdQuery(id, { skip: !isObjectId });
  const product = mockProduct || apiProduct;
  const [addCartItem, { isLoading: isAdding }] = useAddCartItemMutation();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [qty, setQty] = useState(1);
  const [selectedVariantId, setSelectedVariantId] = useState("");
  const [actionError, setActionError] = useState("");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [showStickyBar, setShowStickyBar] = useState(false);

  const variants = useMemo(() => product?.variants || [], [product]);
  const selectedVariant = useMemo(
    () => variants.find((variant) => String(variant._id) === String(selectedVariantId)),
    [variants, selectedVariantId]
  );

  const displayPrice = selectedVariant?.price ?? product?.price;
  const compareAtPrice = product?.compareAtPrice ?? product?.oldPrice ?? product?.msrp;
  const numericPrice = Number(displayPrice || 0);
  const numericCompareAt = Number(compareAtPrice || 0);
  const soldCount = product?.sold ?? product?.totalSold ?? product?.soldCount;
  const reviewCount = product?.numReviews ?? product?.reviewsCount;
  const deliveryEstimate = "Est. Apr 12";
  const featureList = Array.isArray(product?.features) && product.features.length > 0
    ? product.features
    : ["Premium materials", "Strict quality checks", "Eco-friendly packaging"];
  const galleryImages = useMemo(() => {
    const images = Array.isArray(product?.images) ? product.images : [];
    const primary = product?.image ? [product.image] : [];
    const combined = [...primary, ...images].filter(Boolean);
    return combined.length ? combined : [""];
  }, [product]);

  const variantGroups = useMemo(() => {
    const groups = {};
    variants.forEach((variant) => {
      const label = variant?.name || "Option";
      const key = label.toLowerCase();
      if (!groups[key]) {
        groups[key] = { label, items: [] };
      }
      groups[key].items.push(variant);
    });
    return Object.values(groups);
  }, [variants]);
  const fallbackVariantGroups = [
    {
      label: "Color",
      items: [
        { _id: "color-1", value: "Space Gray" },
        { _id: "color-2", value: "Midnight" },
        { _id: "color-3", value: "Silver" },
      ],
    },
    {
      label: "Storage",
      items: [
        { _id: "storage-1", value: "512GB SSD" },
        { _id: "storage-2", value: "1TB SSD" },
      ],
    },
  ];
  const displayVariantGroups = variantGroups.length > 0 ? variantGroups : fallbackVariantGroups;

  const displayName = product?.name || "Nimbus Pro 14 Laptop";
  const displayCategory = product?.category?.name || "Laptops";
  const displayCategorySlug = product?.category?.slug || "laptops";
  const displayBrand = product?.brand || "Nimbus Official Store";
  const displayRating = product?.rating ?? 4.7;
  const displayReviews = reviewCount ?? 1248;
  const displaySold = soldCount ?? "5k+";
  const effectiveCompareAt = numericCompareAt > numericPrice && numericCompareAt
    ? numericCompareAt
    : numericPrice
    ? Math.round(numericPrice * 1.25 * 100) / 100
    : 0;
  const hasDiscount = numericPrice > 0 && effectiveCompareAt > numericPrice;
  const discountPercent = hasDiscount
    ? Math.round(((effectiveCompareAt - numericPrice) / effectiveCompareAt) * 100)
    : 0;

  useEffect(() => {
    setActiveImageIndex((prev) => Math.min(prev, Math.max(0, galleryImages.length - 1)));
  }, [galleryImages.length]);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 320);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isLoading && !mockProduct) {
    return (
      <div className="p-8 text-center text-sm text-slate-500">Loading product...</div>
    );
  }

  if (isError && !mockProduct) {
    return (
      <div className="p-8 text-center text-sm text-rose-700">
        <div className="font-semibold">Unable to load product</div>
        <p className="mt-1">{error?.data?.message || error?.message || "Something went wrong."}</p>
        <button onClick={refetch} className="mt-4 inline-flex items-center rounded-full border border-rose-200 bg-white px-4 py-2 text-sm font-semibold text-rose-700 shadow-sm transition hover:bg-rose-100">Retry</button>
      </div>
    );
  }

  if (!apiProduct && !mockProduct) {
    return (
      <div className="p-8 text-center text-sm text-slate-500">Product not found.</div>
    );
  }

  const handleAddToCart = async () => {
    setActionError("");

    if (variants.length > 0 && !selectedVariantId) {
      setActionError("Please select a variant.");
      return;
    }

    if (userInfo) {
      try {
        await addCartItem({
          productId: product._id,
          qty,
          variantId: selectedVariantId || undefined,
        }).unwrap();
      } catch (err) {
        setActionError(err?.data?.message || "Unable to add to cart.");
      }
      return;
    }

    dispatch(
      addGuestItem({
        productId: product._id,
        name: product.name,
        image: product.image || "",
        price: displayPrice,
        qty,
        variantId: selectedVariantId || "",
        variantLabel: selectedVariant ? `${selectedVariant.name}: ${selectedVariant.value}` : "",
      })
    );
  };

  return (
    <div className="bg-slate-50 text-slate-900">
      <div className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 shadow-sm">
              <span className="text-slate-400">Search</span>
              <input
                className="w-40 bg-transparent text-sm text-slate-700 outline-none"
                placeholder="Search laptops, accessories..."
              />
            </div>
            <span className="hidden text-slate-300 md:inline">|</span>
            <span className="hidden md:inline">Language</span>
            <span className="hidden md:inline">Account</span>
          </div>
          <div className="text-sm font-semibold text-slate-900">Cart</div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 py-8 lg:py-12">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <Link to="/" className="hover:text-slate-900">Home</Link>
            <span className="text-slate-300">&gt;</span>
            <Link to="/categories" className="hover:text-slate-900">Categories</Link>
            <span className="text-slate-300">&gt;</span>
            <Link to={`/category/${displayCategorySlug}`} className="font-semibold text-slate-900 hover:underline">
              {displayCategory}
            </Link>
            <span className="text-slate-300">&gt;</span>
            <span className="truncate text-slate-500">{displayName}</span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1.2fr_0.9fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm lg:sticky lg:top-20">
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-slate-100">
                {galleryImages[activeImageIndex] ? (
                  <img
                    src={galleryImages[activeImageIndex]}
                    alt={displayName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">No image</div>
                )}
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                <span>Thumbnail strip</span>
                <span>{activeImageIndex + 1} / {galleryImages.length}</span>
              </div>
              <div className="mt-3 grid grid-cols-5 gap-2">
                {galleryImages.slice(0, 10).map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setActiveImageIndex(index)}
                    className={`aspect-square overflow-hidden rounded-xl border ${activeImageIndex === index ? "border-slate-900" : "border-slate-200"} bg-slate-100`}
                  >
                    {image ? (
                      <img src={image} alt={`${displayName} ${index + 1}`} className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h1 className="font-display text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
                {displayName}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        viewBox="0 0 20 20"
                        className={`h-4 w-4 ${Number(displayRating || 0) >= star ? "text-amber-500" : "text-slate-200"}`}
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M10 1.5l2.4 5 5.6.8-4 3.9.9 5.6L10 14.8 5.1 16.8l.9-5.6-4-3.9 5.6-.8L10 1.5z" />
                      </svg>
                    ))}
                  </div>
                  <span className="font-semibold text-slate-900">
                    {displayRating ? Number(displayRating).toFixed(1) : "-"}
                  </span>
                </div>
                <span className="text-slate-300">-</span>
                <span>{displayReviews ? `${displayReviews} reviews` : "No reviews yet"}</span>
                <span className="text-slate-300">-</span>
                <span>{displaySold ? `${displaySold} sold` : "Popular choice"}</span>
              </div>

              <div className="mt-6 space-y-4">
                {displayVariantGroups.map((group) => (
                  <div key={group.label}>
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                      {group.label}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {group.items.map((variant) => {
                        const isSelected = String(variant._id) === String(selectedVariantId);
                        return (
                          <button
                            key={variant._id}
                            type="button"
                            onClick={() => setSelectedVariantId(variant._id)}
                            className={`rounded-xl border px-3 py-2 text-sm ${isSelected ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"}`}
                          >
                            {variant.value}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3 text-sm text-slate-600">
                <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <span className="font-semibold text-slate-900">Shipping</span>
                  <span>Free to United States</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <span className="font-semibold text-slate-900">Delivery</span>
                  <span>{deliveryEstimate}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <span className="font-semibold text-slate-900">Voucher</span>
                  <button type="button" className="text-xs font-semibold text-slate-900">Get $2.00 Coupon</button>
                </div>
              </div>

              <div className="mt-6 grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-600">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Highlights</div>
                <div className="grid gap-2 text-sm text-slate-600 md:grid-cols-2">
                  {featureList.map((feature, index) => (
                    <div key={`${feature}-${index}`} className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-slate-400" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4 lg:sticky lg:top-20">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Action box</div>
                <div className="mt-3 text-3xl font-bold text-slate-900 tabular-nums">US ${numericPrice ? numericPrice.toFixed(2) : "-"}</div>
                {hasDiscount && (
                  <div className="mt-2 text-sm text-slate-500">
                    <span className="line-through">US ${effectiveCompareAt.toFixed(2)}</span>
                    <span className="ml-2 rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
                      Save {discountPercent}%
                    </span>
                  </div>
                )}
                <div className="mt-3 text-sm text-slate-500">Extra 5% off with coins</div>

                <div className="mt-4">
                  <div className="text-sm font-semibold text-slate-900">Quantity</div>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                      className="h-10 w-10 rounded-full border border-slate-200 bg-white text-lg text-slate-700 shadow-sm"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={qty}
                      onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
                      className="h-10 w-16 rounded-xl border border-slate-200 bg-white text-center text-sm text-slate-900"
                    />
                    <button
                      type="button"
                      onClick={() => setQty((prev) => prev + 1)}
                      className="h-10 w-10 rounded-full border border-slate-200 bg-white text-lg text-slate-700 shadow-sm"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="mt-5 w-full rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:opacity-70"
                >
                  {isAdding ? "Adding..." : "Buy now"}
                </button>
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="mt-3 w-full rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 disabled:opacity-70"
                >
                  Add to cart
                </button>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Store info</div>
                <div className="mt-2 text-lg font-semibold text-slate-900">{displayBrand}</div>
                <div className="mt-1 text-sm text-slate-500">
                  Response time: <span className="font-semibold text-slate-900">within 2 hours</span>
                </div>
                <button
                  type="button"
                  className="mt-4 w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
                >
                  Follow store
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap gap-3 text-sm font-semibold text-slate-600">
              {["description", "specs", "reviews", "qa"].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-full px-4 py-2 ${activeTab === tab ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600"}`}
                >
                  {tab === "description"
                    ? "Description"
                    : tab === "specs"
                    ? "Specifications"
                    : tab === "reviews"
                    ? "Customer Reviews"
                    : "Q&A"}
                </button>
              ))}
            </div>

            {activeTab === "description" && (
              <div className="mt-6 text-sm leading-6 text-slate-700">
                {product.description || product.category?.description || "No description available."}
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {galleryImages.slice(0, 4).map((image, index) => (
                    <div key={`${image}-${index}`} className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                      {image ? (
                        <img src={image} alt={`${displayName} detail ${index + 1}`} className="h-56 w-full object-cover" />
                      ) : (
                        <div className="h-56 w-full" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "specs" && (
              <div className="mt-6 grid gap-3 text-sm text-slate-700 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Brand</div>
                  <div className="mt-1 font-semibold text-slate-900">{displayBrand}</div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Category</div>
                  <div className="mt-1 font-semibold text-slate-900">{displayCategory}</div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Stock</div>
                  <div className="mt-1 font-semibold text-slate-900">{product.countInStock ?? "Not specified"}</div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-400">SKU</div>
                  <div className="mt-1 font-semibold text-slate-900">{product.sku || product._id?.slice(-8) || "Not specified"}</div>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="mt-6 text-sm text-slate-600">
                {displayReviews ? (
                  <div className="grid gap-4 md:grid-cols-[auto_1fr] md:items-center">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-center">
                      <div className="text-3xl font-bold text-slate-900">{Number(displayRating).toFixed(1)}</div>
                      <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Average</div>
                    </div>
                    <div>
                      <div>{displayReviews} reviews available.</div>
                      <div className="mt-3 flex flex-wrap gap-2 text-xs">
                        <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1">With photos</span>
                        <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1">5-star</span>
                        <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1">From your country</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>No reviews yet. Be the first to review this product.</div>
                )}
              </div>
            )}

            {activeTab === "qa" && (
              <div className="mt-6 text-sm text-slate-600">
                No questions yet. Ask the seller about this product.
              </div>
            )}
          </div>
        </div>

        <div className={`fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur lg:hidden ${showStickyBar ? "block" : "hidden"}`}>
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
            <div>
              <div className="text-xs text-slate-500">Total</div>
              <div className="font-display text-lg font-semibold text-slate-900 tabular-nums">US ${numericPrice ? numericPrice.toFixed(2) : "-"}</div>
            </div>
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isAdding}
              className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:opacity-70"
            >
              {isAdding ? "Adding..." : "Add to cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
