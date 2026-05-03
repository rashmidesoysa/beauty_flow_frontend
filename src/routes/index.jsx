import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import AdminLayout from '../layouts/AdminLayout'
import ProtectedRoute from '../components/ProtectedRoute'

// Customer Pages
import Home from '../pages/Home'
import Shop from '../pages/Shop'
import ProductDetail from '../pages/ProductDetail'
import Cart from '../pages/Cart'
import Checkout from '../pages/Checkout'
import About from '../pages/About'
import Contact from '../pages/Contact'
// import Login from '../pages/Login'
// import Register from '../pages/Register'

// Admin Pages
import AdminLogin from '../pages/admin/Login'
import AdminRegister from '../pages/admin/Register'
import Dashboard from '../features/admin/dashboard/Dashboard'
// import ProductsList from '../features/admin/products/ProductsList'
// import OrdersList from '../features/admin/orders/OrdersList'
// import InventoryOverview from '../features/admin/inventory/InventoryOverview'
// import SuppliersList from '../features/admin/suppliers/SuppliersList'
// import CustomersList from '../features/admin/customers/CustomersList'
// import ReportsPage from '../features/admin/reports/ReportsPage'

// Protected Route wrapper (you can implement later)
// import ProtectedRoute from '../components/ProtectedRoute'

export const router = createBrowserRouter([
  // Customer Routes
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'shop', element: <Shop /> },
      { path: 'product/:id', element: <ProductDetail /> },
      { path: 'cart', element: <Cart /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      // { path: 'login', element: <Login /> },
      // { path: 'register', element: <Register /> },
    ],
  },
  
  // Admin Routes
  {
    path: '/admin/login',
    element: <AdminLogin />,
  },
  {
    path: '/admin/register',
    element: <AdminRegister />,
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      // { path: 'products', element: <ProductsList /> },
      // { path: 'orders', element: <OrdersList /> },
      // { path: 'inventory', element: <InventoryOverview /> },
      // { path: 'suppliers', element: <SuppliersList /> },
      // { path: 'customers', element: <CustomersList /> },
      // { path: 'reports', element: <ReportsPage /> },
    ],
  },
])