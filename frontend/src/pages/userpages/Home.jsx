import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { useGetCategoriesQuery } from "../../redux/ApiSlices/categoryApiSlice";
import { useGetProductsQuery } from "../../redux/ApiSlices/productApiSlice";
import { useGetPublicBannersQuery } from "../../redux/ApiSlices/bannerApiSlice";

const mockCategories = [
  { _id: "c1", name: "Headphone & Bluetooth", slug: "headphone-bluetooth" },
  { _id: "c2", name: "Mobile & iPod", slug: "mobile-ipod" },
  { _id: "c3", name: "Xbox Playstation", slug: "xbox-playstation" },
  { _id: "c4", name: "Double Soundbox", slug: "double-soundbox" },
  { _id: "c5", name: "Washing Machines", slug: "washing-machines" },
  { _id: "c6", name: "Coffee Machine", slug: "coffee-machine" },
  { _id: "c7", name: "New Refrigerator", slug: "new-refrigerator" },
  { _id: "c8", name: "Iron Machine", slug: "iron-machine" },
];

const mockProducts = [
  { _id: "p1", name: "New Gaming Headphone", price: 125, category: { name: "Audio" } },
  { _id: "p2", name: "Xbox Gaming Playstation", price: 300, category: { name: "Gaming" } },
  { _id: "p3", name: "New Washing Machine", price: 150, category: { name: "Home Appliances" } },
  { _id: "p4", name: "Family Rice Cookers", price: 125, category: { name: "Kitchen" } },
  { _id: "p5", name: "Gaming Motherboard", price: 225, category: { name: "PC Accessories" } },
  { _id: "p6", name: "Computer Monitor", price: 125, category: { name: "PC Accessories" } },
  { _id: "p7", name: "RGB Mouse Pad", price: 225, category: { name: "PC Accessories" } },
  { _id: "p8", name: "Home Refrigerator", price: 225, category: { name: "Home Appliances" } },
  { _id: "p9", name: "Washing Machine", price: 125, category: { name: "Home Appliances" } },
  { _id: "p10", name: "Iron Machine", price: 225, category: { name: "Home Appliances" } },
];

const fallbackBanners = {
  hero_main: [
    {
      _id: "hero-main-1",
      title: "iPhone 16 Max Mini Pro",
      subtitle: "We collect latest phone series and apply selected accessories for modern lifestyle.",
      link: "/categories",
      image: "",
    },
  ],
  hero_side: [
    { _id: "hero-side-1", title: "Drone Offer 60% Off", subtitle: "New collection", link: "/categories", image: "" },
    { _id: "hero-side-2", title: "Best Gaming Computer", subtitle: "Top picks", link: "/categories", image: "" },
    {
      _id: "hero-side-3",
      title: "Gaming Xbox Playstation",
      subtitle: "Hot sale",
      link: "/categories",
      image: "",
    },
  ],
  deal_promo: [
    {
      _id: "deal-promo-1",
      title: "Black Friday Offer Now Available",
      subtitle: "Get 50% Discount",
      link: "/categories",
      image: "",
    },
    {
      _id: "deal-promo-2",
      title: "Dell Laptop Offer Get Discount",
      subtitle: "Get 50% Discount",
      link: "/categories",
      image: "",
    },
  ],
  accessory_side: [
    {
      _id: "accessory-side-1",
      title: "Get 50% Discount For PC Accessories",
      subtitle: "Category promo",
      link: "/categories",
      image: "",
    },
  ],
  recent_side: [
    {
      _id: "recent-side-1",
      title: "Get 40% Discount For Home Appliance",
      subtitle: "Limited deal",
      link: "/categories",
      image: "",
    },
    {
      _id: "recent-side-2",
      title: "Get 10% Discount For Appliance",
      subtitle: "Limited deal",
      link: "/categories",
      image: "",
    },
  ],
  summer_left: [
    { _id: "summer-left-1", title: "Virtual Gaming VR Headset", subtitle: "Summer offer", link: "/categories", image: "" },
  ],
  summer_bottom: [
    {
      _id: "summer-bottom-1",
      title: "Summer Biggest Selling Offer",
      subtitle: "Summer offer",
      link: "/categories",
      image: "",
    },
  ],
  bottom_cta: [
    {
      _id: "bottom-cta-1",
      title: "Get Ready To Shopping With Weekly 50% Discount Offer",
      subtitle: "Discount week",
      link: "/categories",
      image: "",
    },
  ],
};

const PlaceholderImage = ({ label, className = "" }) => (
  <div
    className={`placeholder-image flex items-center justify-center rounded-2xl border border-[#ffd0d8] bg-white text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#ef3f62] ${className}`}
  >
    {label}
  </div>
);

const BannerVisual = ({ banner, className = "", fallbackLabel = "Banner" }) =>
  banner?.image ? (
    <img src={banner.image} alt={banner.title || fallbackLabel} className={`${className} rounded-2xl object-cover`} />
  ) : (
    <PlaceholderImage label={banner?.title || fallbackLabel} className={className} />
  );

const ProductCard = ({ product }) => (
  <Link to={`/product/${product._id}`} className="home-card block rounded-2xl border border-[#ffd2da] bg-white p-3">
    {product.image ? (
      <img src={product.image} alt={product.name} className="h-40 w-full rounded-2xl object-cover" />
    ) : (
      <PlaceholderImage label={product.name} className="h-40 w-full" />
    )}
    <div className="mt-3 text-[11px] uppercase tracking-[0.2em] text-[#9d9d9d]">
      {product.category?.name || "Category"}
    </div>
    <div className="mt-1 line-clamp-2 text-sm font-bold text-[#222]">{product.name}</div>
    <div className="mt-2 text-sm font-extrabold text-[#ef3f62]">${Number(product.price || 0).toFixed(2)}</div>
  </Link>
);

const Home = () => {
  const location = useLocation();
  const authMessage = location.state?.authMessage;

  const { data: categoriesData } = useGetCategoriesQuery();
  const { data: productsData } = useGetProductsQuery();
  const { data: bannersData } = useGetPublicBannersQuery();

  const categories = categoriesData?.categories?.length ? categoriesData.categories : mockCategories;
  const products = productsData?.products?.length ? productsData.products : mockProducts;

  const topCategories = useMemo(() => categories.slice(0, 8), [categories]);
  const dealOfWeek = useMemo(() => products.slice(0, 4), [products]);
  const accessoryProducts = useMemo(() => products.slice(4, 7), [products]);
  const recentProducts = useMemo(() => products.slice(0, 8), [products]);
  const hotList = useMemo(() => products.slice(2, 8), [products]);
  const activeBanners = bannersData?.banners || [];

  const bannersByPosition = useMemo(() => {
    return activeBanners.reduce((acc, banner) => {
      if (!acc[banner.position]) acc[banner.position] = [];
      acc[banner.position].push(banner);
      return acc;
    }, {});
  }, [activeBanners]);

  const getBanners = (position, count = 1) => {
    const fromApi = bannersByPosition[position] || [];
    if (fromApi.length >= count) return fromApi.slice(0, count);
    const fallback = fallbackBanners[position] || [];
    return [...fromApi, ...fallback].slice(0, count);
  };

  const heroMainBanner = getBanners("hero_main", 1)[0];
  const heroSideBanners = getBanners("hero_side", 3);
  const dealPromoBanners = getBanners("deal_promo", 2);
  const accessorySideBanner = getBanners("accessory_side", 1)[0];
  const recentSideBanners = getBanners("recent_side", 2);
  const summerLeftBanner = getBanners("summer_left", 1)[0];
  const summerBottomBanner = getBanners("summer_bottom", 1)[0];
  const bottomCtaBanner = getBanners("bottom_cta", 1)[0];

  return (
    <div className="homepage-v2 font-home bg-[#f6f6f7] py-6">
      <div className="mx-auto w-full max-w-[1280px] space-y-7 px-4 md:px-6">
        {authMessage && (
          <div className="rounded-xl border border-[#ffd0d8] bg-[#fff2f5] px-4 py-3 text-sm font-medium text-[#ef3f62]">
            {authMessage}
          </div>
        )}

        <section className="rounded-2xl bg-white p-4 shadow-sm md:p-5">
          <div className="grid gap-3 lg:grid-cols-[2.2fr_1fr]">
            <div className="rounded-2xl bg-[#f8f8f8] p-5 md:p-8">
              <div className="text-xs uppercase tracking-[0.28em] text-[#8e8e8e]">iPhone Series</div>
              <h1 className="mt-2 font-display text-3xl font-bold leading-tight text-[#222] md:text-5xl">
                {heroMainBanner?.title || "iPhone 16 Max Mini Pro"}
              </h1>
              <p className="mt-3 max-w-md text-sm text-[#6c6c6c]">
                {heroMainBanner?.subtitle ||
                  "We collect latest phone series and apply selected accessories for modern lifestyle."}
              </p>
              <Link
                to={heroMainBanner?.link || "/categories"}
                className="mt-5 inline-flex rounded-full bg-[#ef3f62] px-5 py-2 text-sm font-semibold text-white"
              >
                Shop now
              </Link>
              <BannerVisual banner={heroMainBanner} fallbackLabel="Hero Product Image" className="mt-5 h-56 w-full md:h-72" />
            </div>

            <div className="grid gap-3">
              {heroSideBanners.map((item) => (
                <div key={item._id} className="rounded-2xl border border-[#ffd2da] bg-white p-4">
                  <div className="text-xs uppercase tracking-[0.25em] text-[#8f8f8f]">
                    {item.subtitle || "New Collection"}
                  </div>
                  <div className="mt-1 text-lg font-bold text-[#1f1f1f]">{item.title}</div>
                  <Link
                    to={item.link || "/categories"}
                    className="mt-3 inline-flex rounded-full bg-[#ef3f62] px-4 py-1.5 text-xs font-semibold text-white"
                  >
                    Shop now
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-3 rounded-2xl bg-white p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-5">
          {[
            "24/7 Hours Support",
            "Free Shipping Service",
            "Secure Payment Method",
            "Money Return Policy",
            "Secure Privacy",
          ].map((feature) => (
            <div key={feature} className="rounded-xl border border-[#ffe0e5] bg-[#fffafb] p-3 text-center text-sm font-semibold text-[#333]">
              {feature}
            </div>
          ))}
        </section>

        <section className="rounded-2xl bg-white p-4 shadow-sm md:p-6">
          <h2 className="text-center font-display text-3xl font-bold text-[#222]">Explore Top Categories</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {topCategories.map((category) => (
              <Link
                key={category._id}
                to={`/category/${category.slug || category._id}`}
                className="home-card rounded-xl border border-[#ffe0e5] bg-white p-3"
              >
                <div className="flex items-center gap-3">
                  <PlaceholderImage label={category.name} className="h-14 w-14 shrink-0 rounded-xl" />
                  <div>
                    <div className="text-sm font-bold text-[#272727]">{category.name}</div>
                    <div className="text-xs text-[#7a7a7a]">Best collection</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-5 text-center">
            <Link to="/categories" className="inline-flex rounded-full bg-[#ef3f62] px-5 py-2 text-sm font-semibold text-white">
              Explore More
            </Link>
          </div>
        </section>

        <section className="rounded-2xl border border-[#ffc7d2] bg-white p-4 shadow-sm md:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-3xl font-bold text-[#222]">Deal Of The Week</h2>
            <button className="rounded-full bg-[#ef3f62] px-4 py-1.5 text-xs font-semibold text-white">View More</button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {dealOfWeek.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          {dealPromoBanners.map((banner, index) => (
            <div key={banner._id || index} className="rounded-2xl border border-[#ffd9df] bg-white p-5">
              <div className="text-xs uppercase tracking-[0.24em] text-[#8c8c8c]">
                {banner.subtitle || "Get 50% Discount"}
              </div>
              <h3 className="mt-2 text-3xl font-bold text-[#222]">{banner.title}</h3>
              <BannerVisual banner={banner} fallbackLabel={`Offer Banner ${index + 1}`} className="mt-4 h-48 w-full" />
            </div>
          ))}
        </section>

        <section className="rounded-2xl bg-white p-4 shadow-sm md:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-3xl font-bold text-[#222]">New Computer Accessories</h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-[1fr_3fr]">
            <div className="rounded-2xl border border-[#ffd9df] bg-[#fff9fa] p-4">
              <h3 className="text-2xl font-bold text-[#222]">
                {accessorySideBanner?.title || "Get 50% Discount For PC Accessories"}
              </h3>
              <Link
                to={accessorySideBanner?.link || "/categories"}
                className="mt-4 inline-flex rounded-full bg-[#ef3f62] px-4 py-2 text-xs font-semibold text-white"
              >
                Shop Now
              </Link>
              <BannerVisual banner={accessorySideBanner} fallbackLabel="PC Offer Banner" className="mt-4 h-56 w-full" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {accessoryProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-4 shadow-sm md:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-3xl font-bold text-[#222]">Recently Added Products</h2>
            <div className="flex items-center gap-2 text-xs">
              <button className="rounded-full border border-[#ffd0d8] bg-[#ef3f62] px-3 py-1 text-white">Featured</button>
              <button className="rounded-full border border-[#ffd0d8] bg-white px-3 py-1 text-[#444]">Popular</button>
              <button className="rounded-full border border-[#ffd0d8] bg-white px-3 py-1 text-[#444]">Low Price</button>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[3fr_1fr]">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {recentProducts.map((product) => (
                <ProductCard key={`${product._id}-recent`} product={product} />
              ))}
            </div>
            <div className="grid gap-4">
              {recentSideBanners.map((banner, index) => (
                <div key={banner._id || index} className="rounded-2xl border border-[#ffd9df] bg-[#fff9fa] p-4">
                  <h4 className="text-xl font-bold text-[#222]">{banner.title}</h4>
                  <Link
                    to={banner.link || "/categories"}
                    className="mt-3 inline-flex rounded-full bg-[#ef3f62] px-3 py-1.5 text-xs font-semibold text-white"
                  >
                    Get Discount
                  </Link>
                  <BannerVisual
                    banner={banner}
                    fallbackLabel={`Appliance Promo ${index + 1}`}
                    className="mt-4 h-40 w-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-4 shadow-sm md:p-6">
          <div className="grid gap-4 lg:grid-cols-[2fr_1.5fr]">
            <div className="grid gap-4">
              <div className="rounded-2xl border border-[#dce9ff] bg-[#f7fbff] p-4">
                <h3 className="text-2xl font-bold text-[#222]">
                  {summerLeftBanner?.title || "Virtual Gaming VR Headset"}
                </h3>
                <BannerVisual banner={summerLeftBanner} fallbackLabel="Summer Offer 01" className="mt-4 h-40 w-full" />
              </div>
              <div className="rounded-2xl border border-[#dce9ff] bg-[#f7fbff] p-4">
                <h3 className="text-2xl font-bold text-[#222]">
                  {summerBottomBanner?.title || "Summer Biggest Selling Offer"}
                </h3>
                <BannerVisual
                  banner={summerBottomBanner}
                  fallbackLabel="Summer Offer 02"
                  className="mt-4 h-40 w-full"
                />
              </div>
            </div>
            <div className="rounded-2xl border border-[#ffe0e5] bg-white p-4">
              <h2 className="font-display text-3xl font-bold text-[#222]">Hot Summer Offer</h2>
              <div className="mt-4 space-y-3">
                {hotList.map((product) => (
                  <Link
                    key={`${product._id}-hot`}
                    to={`/product/${product._id}`}
                    className="home-card flex items-center gap-3 rounded-xl border border-[#ffe0e5] p-3"
                  >
                    <PlaceholderImage label="IMG" className="h-14 w-14 shrink-0 rounded-lg" />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-semibold text-[#222]">{product.name}</div>
                      <div className="text-xs font-bold text-[#ef3f62]">${Number(product.price || 0).toFixed(2)}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl bg-[#111622] p-6 text-white shadow-sm">
          <div className="grid items-center gap-4 md:grid-cols-[1.5fr_1fr]">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-white/70">
                {bottomCtaBanner?.subtitle || "Discount Week"}
              </div>
              <h3 className="mt-2 text-3xl font-bold">
                {bottomCtaBanner?.title || "Get Ready To Shopping With Weekly 50% Discount Offer"}
              </h3>
              <Link
                to={bottomCtaBanner?.link || "/categories"}
                className="mt-4 inline-flex rounded-full bg-[#ef3f62] px-4 py-2 text-sm font-semibold text-white"
              >
                Start Shopping Now
              </Link>
            </div>
            {bottomCtaBanner?.image ? (
              <img
                src={bottomCtaBanner.image}
                alt={bottomCtaBanner.title || "Bottom Promo Hero"}
                className="h-48 w-full rounded-2xl border border-white/20 object-cover"
              />
            ) : (
              <PlaceholderImage
                label="Bottom Promo Hero"
                className="h-48 w-full border-white/20 bg-white/5 text-white"
              />
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
