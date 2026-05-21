import { createContext, useContext, useState, useEffect } from "react";
import { customerApi } from "../api/customer";
import toast from "react-hot-toast";

const CustomerAuthContext = createContext();

export const useCustomerAuth = () => {
  const context = useContext(CustomerAuthContext);
  if (!context) {
    throw new Error("useCustomerAuth must be used within CustomerAuthProvider");
  }
  return context;
};

export const CustomerAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem("customer_token");
    const storedUser = localStorage.getItem("customer_user");

    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("customer_token");
        localStorage.removeItem("customer_user");
      }
    }

    // Load cart from localStorage
    const storedCart = localStorage.getItem("customer_cart");
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (error) {
        console.error("Error parsing cart:", error);
      }
    }

    setLoading(false);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("customer_cart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("customer_cart");
    }
  }, [cart]);

  const register = async (userData) => {
    try {
      const response = await customerApi.register(userData);

      if (response.data.token) {
        localStorage.setItem("customer_token", response.data.token);
        localStorage.setItem(
          "customer_user",
          JSON.stringify(response.data.user),
        );
        setUser(response.data.user);
        toast.success("Registration successful!");
        return { success: true, user: response.data.user };
      } else {
        toast.error(response.data.message || "Registration failed");
        return { success: false };
      }
    } catch (error) {
      console.error("Registration error:", error);
      const message = error.response?.data?.message || "Registration failed";
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const login = async (credentials, redirectPath = null) => {
    try {
      const response = await customerApi.login(credentials);

      if (response.data.token) {
        localStorage.setItem("customer_token", response.data.token);

        // Fetch user profile
        try {
          const profileResponse = await customerApi.getProfile();
          localStorage.setItem(
            "customer_user",
            JSON.stringify(profileResponse.data),
          );
          setUser(profileResponse.data);
        } catch (error) {
          // If profile endpoint fails, create a basic user object
          const basicUser = { email: credentials.email };
          localStorage.setItem("customer_user", JSON.stringify(basicUser));
          setUser(basicUser);
        }

        toast.success("Login successful!");

        // Redirect to the saved path or home
        const redirectTo =
          sessionStorage.getItem("redirectAfterLogin") || redirectPath || "/";
        sessionStorage.removeItem("redirectAfterLogin");

        return { success: true, redirectTo };
      } else {
        toast.error(response.data.message || "Login failed");
        return { success: false };
      }
    } catch (error) {
      console.error("Login error:", error);
      const message = error.response?.data?.message || "Login failed";
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem("customer_token");
      if (token) {
        await customerApi.logout();
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("customer_token");
      localStorage.removeItem("customer_user");
      setUser(null);
      toast.success("Logged out successfully");
    }
  };

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
    toast.success(`${product.item_name} added to cart!`);
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    toast.success("Item removed from cart");
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === productId ? { ...item, quantity } : item,
        ),
      );
    }
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("customer_cart");
  };

  const getCartTotal = () => {
    return cart.reduce(
      (total, item) => total + parseFloat(item.list_price || 0) * item.quantity,
      0,
    );
  };

  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CustomerAuthContext.Provider
      value={{
        user,
        loading,
        cart,
        register,
        login,
        logout,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        getCartTotal,
        getCartItemCount,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </CustomerAuthContext.Provider>
  );
};
