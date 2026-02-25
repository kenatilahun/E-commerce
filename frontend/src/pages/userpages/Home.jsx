import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../../components/home/Hero";
import FeaturedCategories from "../../components/home/FeaturedCategories";
import FeaturedProducts from "../../components/home/FeaturedProducts";
import { useGetCategoriesQuery } from "../../redux/ApiSlices/categoryApiSlice";
import { useGetProductsQuery } from "../../redux/ApiSlices/productApiSlice";

const Home = () => {
  const location = useLocation();
  const authMessage = location.state?.authMessage;

  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    isError: categoriesError,
    error: categoriesErrorDetails,
    refetch: refetchCategories,
  } = useGetCategoriesQuery();

  const {
    data: productsData,
    isLoading: productsLoading,
    isError: productsError,
    error: productsErrorDetails,
    refetch: refetchProducts,
  } = useGetProductsQuery();

  const categories = categoriesData?.categories || [];
  const products = productsData?.products || [];

  const categoryGroups = useMemo(
    () => [categories.slice(0, 4), categories.slice(4, 8), categories.slice(8, 12)],
    [categories]
  );

  const heroProducts = useMemo(() => products.slice(0, 3), [products]);
  const featuredProducts = useMemo(() => products.slice(0, 8), [products]);

  return (
    <div className="font-home space-y-12 pb-16">
      {authMessage && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
          {authMessage}
        </div>
      )}

      <Hero products={heroProducts} isLoading={productsLoading} isError={productsError} />

      <FeaturedCategories
        title="Featured categories"
        subtitle="Shop the edits our stylists are excited about this week."
        categories={categoryGroups[0]}
        isLoading={categoriesLoading}
        isError={categoriesError}
        error={categoriesErrorDetails}
        onRetry={refetchCategories}
      />

      <FeaturedCategories
        title="Featured categories"
        subtitle="Discover seasonal releases and new brand collections."
        categories={categoryGroups[1]}
        isLoading={categoriesLoading}
        isError={categoriesError}
        error={categoriesErrorDetails}
        onRetry={refetchCategories}
      />

      <FeaturedCategories
        title="Featured categories"
        subtitle="Customer favorites for every day essentials."
        categories={categoryGroups[2]}
        isLoading={categoriesLoading}
        isError={categoriesError}
        error={categoriesErrorDetails}
        onRetry={refetchCategories}
      />

      <FeaturedProducts
        title="Editor-approved picks"
        products={featuredProducts}
        isLoading={productsLoading}
        isError={productsError}
        error={productsErrorDetails}
        onRetry={refetchProducts}
      />
    </div>
  );
};

export default Home;
