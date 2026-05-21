import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import CustomerProtectedRoute from "../components/CustomerProtectedRoute";

// Customer Pages
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import About from "../pages/About";
import Contact from "../pages/Contact";
import CustomerLogin from "../pages/CustomerLogin";
import CustomerRegister from "../pages/CustomerRegister";

// Admin Pages
import AdminLogin from "../pages/admin/Login";
import AdminRegister from "../pages/admin/Register";
import Dashboard from "../features/admin/dashboard/Dashboard";
import CategoriesList from "../features/admin/categories/CategoriesList";
import SubCategoriesList from "../features/admin/subcategories/SubCategoriesList";
import BrandsList from "../features/admin/brands/BrandsList";
import SuppliersList from "../features/admin/suppliers/SuppliersList";
import ItemsList from "../features/admin/items/ItemsList";

export const router = createBrowserRouter([
  // Customer Routes
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "shop", element: <Shop /> },
      { path: "product/:id", element: <ProductDetail /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      // { path: 'login', element: <Login /> },
      // { path: 'register', element: <Register /> },
    ],
  },
  {
    path: "/customer/login",
    element: <CustomerLogin />,
  },
  {
    path: "/customer/register",
    element: <CustomerRegister />,
  },

  {
    path: "/cart",
    element: (
      <CustomerProtectedRoute>
        <MainLayout />
      </CustomerProtectedRoute>
    ),
    children: [{ index: true, element: <Cart /> }],
  },
  // {
  //   path: "/checkout",
  //   element: (
  //     <CustomerProtectedRoute>
  //       <MainLayout />
  //     </CustomerProtectedRoute>
  //   ),
  //   children: [{ index: true, element: <Checkout /> }],
  // },

  // Admin Routes
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin/register",
    element: <AdminRegister />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "products/categories", element: <CategoriesList /> },
      { path: "products/subcategories", element: <SubCategoriesList /> },
      { path: "products/brands", element: <BrandsList /> },
      { path: "suppliers", element: <SuppliersList /> },
      { path: "items", element: <ItemsList /> },
    ],
  },
]);
