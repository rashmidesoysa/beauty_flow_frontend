import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBox,
  FaShoppingCart,
  FaWarehouse,
  FaTruck,
  FaUsers,
  FaChartLine,
  FaChevronDown,
  FaChevronLeft,
  FaTags,
  FaPalette,
  FaHourglassHalf,
  FaClipboardList,
  FaStar,
  FaGift,
  FaCog,
  FaSignOutAlt,
  FaFolder,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// Menu items with submenus
const menuItems = [
  {
    path: "/admin",
    name: "Dashboard",
    icon: FaTachometerAlt,
    exact: true,
  },
  {
    name: "Catalog",
    icon: FaBox,
    submenu: [
      { path: "/admin/products", name: "All Products", icon: FaTags },
      {
        path: "/admin/products/categories",
        name: "Categories",
        icon: FaPalette,
      },
      {
        path: "/admin/products/subcategories",
        name: "Subcategories",
        icon: FaFolder,
      },
      { path: "/admin/products/brands", name: "Brands", icon: FaStar },
      {
        path: "/admin/products/offers",
        name: "Offers & Discounts",
        icon: FaGift,
      },
    ],
  },
  {
    name: "Orders",
    icon: FaShoppingCart,
    submenu: [
      { path: "/admin/orders", name: "All Orders", icon: FaClipboardList },
      {
        path: "/admin/orders/pending",
        name: "Pending Orders",
        icon: FaHourglassHalf,
      },
      { path: "/admin/orders/processing", name: "Processing", icon: FaCog },
      { path: "/admin/orders/completed", name: "Completed", icon: FaStar },
    ],
  },
  {
    path: "/admin/inventory",
    name: "Inventory",
    icon: FaWarehouse,
    badge: "Low Stock",
    badgeColor: "red",
  },
  {
    name: "Suppliers",
    icon: FaTruck,
    submenu: [
      { path: "/admin/suppliers", name: "All Suppliers" },
      { path: "/admin/suppliers/performance", name: "Performance Metrics" },
      { path: "/admin/suppliers/grn", name: "Goods Received Notes" },
    ],
  },
  {
    name: "Customers",
    icon: FaUsers,
    submenu: [
      { path: "/admin/customers", name: "All Customers" },
      { path: "/admin/customers/reviews", name: "Reviews & Ratings" },
      { path: "/admin/customers/wishlist", name: "Wishlists" },
    ],
  },
  {
    path: "/admin/reports",
    name: "Reports",
    icon: FaChartLine,
    badge: "New",
    badgeColor: "green",
  },
];

export default function Sidebar({ isOpen, setIsOpen }) {
  const [openMenus, setOpenMenus] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const toggleSubmenu = (menuName) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  // Check if any submenu item is active
  const isSubmenuActive = (submenuItems) => {
    return submenuItems?.some((item) => location.pathname === item.path);
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar - Light Mode */}
      <aside
        className={`
        fixed md:sticky top-0 left-0 z-30 h-screen 
        bg-white
        shadow-lg
        transform transition-all duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0
        w-64
        overflow-y-auto
        scrollbar-hide
      `}
      >
        {/* Logo Section */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                Beauty Flow
              </h1>
              <p className="text-xs text-gray-500 mt-1">Admin Portal</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="md:hidden text-gray-400 hover:text-gray-600"
            >
              <FaChevronLeft size={16} />
            </button>
          </div>
        </div>

        {/* Navigation Menu - No overflow, just natural height */}
        <nav className="mt-6 px-3 pb-24">
          {menuItems.map((item) => (
            <div key={item.name} className="mb-1">
              {item.submenu ? (
                // Menu with submenu
                <div>
                  <button
                    onClick={() => toggleSubmenu(item.name)}
                    className={`
                      w-full flex items-center justify-between px-3 py-2.5 rounded-lg
                      transition-all duration-200
                      ${
                        isSubmenuActive(item.submenu)
                          ? "bg-pink-50 text-pink-600"
                          : "text-gray-700 hover:bg-gray-50 hover:text-pink-600"
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="text-lg" />
                      <span className="font-medium text-sm">{item.name}</span>
                    </div>
                    <FaChevronDown
                      className={`transition-transform duration-200 text-xs
                        ${openMenus[item.name] ? "rotate-180" : ""}
                      `}
                    />
                  </button>

                  {/* Submenu Items */}
                  {openMenus[item.name] && (
                    <div className="ml-9 mt-1 space-y-1">
                      {item.submenu.map((subItem) => (
                        <NavLink
                          key={subItem.path}
                          to={subItem.path}
                          className={({ isActive }) => `
                            flex items-center gap-3 px-3 py-2 rounded-lg
                            transition-all duration-200 text-sm
                            ${
                              isActive
                                ? "bg-pink-50 text-pink-600"
                                : "text-gray-500 hover:bg-gray-50 hover:text-pink-600"
                            }
                          `}
                          onClick={() => setIsOpen(false)}
                        >
                          {subItem.icon && <subItem.icon className="text-xs" />}
                          <span>{subItem.name}</span>
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                // Direct link
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center justify-between px-3 py-2.5 rounded-lg
                    transition-all duration-200
                    ${
                      isActive
                        ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md"
                        : "text-gray-700 hover:bg-gray-50 hover:text-pink-600"
                    }
                  `}
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="text-lg" />
                    <span className="font-medium text-sm">{item.name}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`
                      text-xs px-2 py-1 rounded-full
                      ${item.badgeColor === "red" ? "bg-red-100 text-red-600" : ""}
                      ${item.badgeColor === "green" ? "bg-green-100 text-green-600" : ""}
                      ${!item.badgeColor ? "bg-pink-100 text-pink-600" : ""}
                    `}
                    >
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              )}
            </div>
          ))}
        </nav>

        {/* Footer Section in Sidebar - Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
          >
            <FaSignOutAlt className="text-lg" />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
