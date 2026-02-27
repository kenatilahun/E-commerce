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
import AdminLayout from "../pages/adminpages/AdminLayout";
import CreateProductForm from "../pages/adminpages/productmanagment/Addproduct";
import ProductsPage from "../pages/adminpages/productmanagment/productlistpage";
import AddCategory from "../pages/adminpages/categorymanagment/AddCategory";
import UsersAdmin from "../pages/adminpages/users/UsersAdmin";
import AdminRoute from "../components/RouteGuards/AdminRoute";
import BannersPage from "../pages/adminpages/bannermanagment/BannersPage";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:slug" element={<CategoryProducts />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
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

