import { Navigate, useLocation } from "react-router-dom";
import { useCustomerAuth } from "../context/CustomerAuthContext";

export default function CustomerProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useCustomerAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Save the attempted URL to redirect after login
    return <Navigate to="/customer/login" state={{ from: location }} replace />;
  }

  return children;
}
