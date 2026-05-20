import react from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../components/Navbar/layout";
import Home from "../pages/userpages/Home";
import Login from "../pages/userpages/login";
import Profile from "../pages/userpages/profile2";
import Register from "../pages/userpages/register";
import Profile2 from "../pages/userpages/profile";
import MYaccount from "../pages/userpages/myaccount";
import Categories from "../pages/userpages/Categories";
import CategoryProducts from "../pages/userpages/CategoryProducts";
import ProductDetail from "../pages/userpages/ProductDetail";
import Cart from "../pages/userpages/Cart";
import Checkout from "../pages/userpages/Checkout";
import AdminLayout from "../pages/adminpages/AdminLayout";
import CreateProductForm from "../pages/adminpages/productmanagment/Addproduct";
import ProductsPage from "../pages/adminpages/productmanagment/productlistpage";
import AddCategory from "../pages/adminpages/categorymanagment/AddCategory";
import UsersAdmin from "../pages/adminpages/users/UsersAdmin";
import AdminRoute from "../components/RouteGuards/AdminRoute";
import BannersPage from "../pages/adminpages/bannermanagment/BannersPage";
import MockupHomepage from "../components/mockups/electronics-shop/Homepage";
import MockupProductListing from "../components/mockups/electronics-shop/ProductListing";
import MockupProductDetail from "../components/mockups/electronics-shop/ProductDetailMockup";
import MockupCartPage from "../components/mockups/electronics-shop/CartPageMockup";
import MockupCheckoutPage from "../components/mockups/electronics-shop/CheckoutPageMockup";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MockupHomepage />} />
      <Route path="/products" element={<MockupProductListing />} />
      <Route path="/product" element={<MockupProductDetail />} />
      <Route path="/cart" element={<MockupCartPage />} />
      <Route path="/checkout" element={<MockupCheckoutPage />} />
      <Route path="/" element={<Layout />}>
        <Route path="/store-home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:slug" element={<CategoryProducts />} />
        <Route path="/store-product/:id" element={<ProductDetail />} />
        <Route path="/store-cart" element={<Cart />} />
        <Route path="/store-checkout" element={<Checkout />} />
        <Route path="myaccount" element={<MYaccount />}>
          <Route path="pro" element={<Profile2 />} />
        </Route>
      </Route>

      <Route path="/admin" element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<ProductsPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/new" element={<CreateProductForm />} />
          <Route path="categories/new" element={<AddCategory />} />
          <Route path="customers" element={<UsersAdmin />} />
          <Route path="banners" element={<BannersPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default Router;

