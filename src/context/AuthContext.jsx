import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("admin_token");
    const storedUser = localStorage.getItem("admin_user");

    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("admin_token");
        localStorage.removeItem("admin_user");
      }
    }
    setLoading(false);
  }, []);

  const register = async (userData) => {
    try {
      const response = await api.post("/api/admin/register", userData);
      console.log("Registration response:", response.data);

      // Check if registration was successful
      if (response.data.success && response.data.token) {
        const userData = response.data.user;

        // Store token and user data
        localStorage.setItem("admin_token", response.data.token);
        localStorage.setItem("admin_user", JSON.stringify(userData));
        setUser(userData);

        toast.success(response.data.message);
        return {
          success: true,
          data: response.data, // Return the full response data
        };
      } else {
        toast.error(response.data.message || "Registration failed");
        return { success: false, error: response.data.message };
      }
    } catch (error) {
      console.error("Registration error:", error);

      // Handle validation errors (422)
      if (error.response?.status === 422) {
        const errors = error.response.data.errors;
        const firstError = Object.values(errors)[0]?.[0];
        toast.error(firstError || "Validation error");
        return { success: false, errors: errors, error: "Validation failed" };
      }

      const message = error.response?.data?.message || "Registration failed";
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const login = async (credentials) => {
    try {
      console.log("Attempting login with:", credentials.email);
      const response = await api.post("/api/admin/login", credentials);
      console.log("Login response:", response.data);

      if (response.data.success && response.data.token) {
        const userData = response.data.user;

        if (userData.user_type !== "A") {
          toast.error("Access denied. Admin privileges required.");
          return { success: false, error: "Not an admin user" };
        }

        localStorage.setItem("admin_token", response.data.token);
        localStorage.setItem("admin_user", JSON.stringify(userData));
        setUser(userData);

        toast.success(response.data.message);
        return { success: true };
      } else {
        toast.error(response.data.message || "Login failed");
        return { success: false };
      }
    } catch (error) {
      console.error("Login error details:", error);

      let errorMessage = "Login failed. Please try again.";

      if (error.response) {
        console.log("Error status:", error.response.status);
        console.log("Error data:", error.response.data);

        if (error.response.status === 401) {
          errorMessage =
            error.response.data?.message || "Invalid email or password";
          // Don't show session expired message for login failures
          toast.error(errorMessage);
        } else if (error.response.status === 422) {
          errorMessage = "Please check your input";
          toast.error(errorMessage);
        } else if (error.response.status === 500) {
          errorMessage = "Server error. Please try again later.";
          toast.error(errorMessage);
        }
      } else if (error.request) {
        errorMessage =
          "Cannot connect to server. Please check your connection.";
        toast.error(errorMessage);
      }

      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      if (token) {
        await api.post("/api/admin/logout");
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_user");
      setUser(null);
      toast.success("Logged out successfully");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
