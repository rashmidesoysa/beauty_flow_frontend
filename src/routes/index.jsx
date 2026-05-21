import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoute from "../components/ProtectedRoute";

// Customer Pages
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import About from "../pages/About";
import Contact from "../pages/Contact";
// import Login from '../pages/Login'
// import Register from '../pages/Register'

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
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      // { path: 'login', element: <Login /> },
      // { path: 'register', element: <Register /> },
    ],
  },

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
