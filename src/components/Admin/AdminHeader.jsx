import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import {
  Bell,
  Heart,
  ShoppingCart,
  User,
} from "lucide-react";

const AdminHeader = () => {
  const navigate = useNavigate();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
      navigate("/"); 
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/produk?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const getCartCount = () => {
    if (!currentUser) return 0;
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const userCart = cart.filter((item) => item.userId === currentUser.id);
    return userCart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-2">
          <img
            src="/src/assets/gambarUser/logo-missglam.png"
            alt="Miss Glam Logo"
            className="h-13 w-auto cursor-pointer"
            onClick={() => navigate("/home")}
          />
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-6">

          {/* User Section */}
          {currentUser ? (
            <div className="relative">
              <div
                className="flex items-center space-x-2 cursor-pointer hover:text-pink-500 transition-colors"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <User className="w-6 h-6 text-gray-600" />
                <span className="text-gray-600 hidden sm:block font-medium">
                  Hi, {currentUser.username}
                </span>
              </div>

              {showDropdown && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-4 space-y-3 text-sm font-medium">
                  {/* User Info */}
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-300">
                      <img
                        src="/src/assets/gambarUser/user.jpg"
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex flex-col justify-center">
                      <span className="text-gray-900 text-base font-semibold">
                        {currentUser.username}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {currentUser.email}
                      </span>
                     
                    </div>
                  </div>

                  {/* Logout */}
                  <button
                    onClick={() => {
                      handleLogout();
                      setShowDropdown(false);
                    }}
                    className="w-full text-left text-red-500 font-medium flex items-center space-x-2 mt-2 hover:text-red-600"
                  >
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div
              className="flex items-center space-x-2 cursor-pointer hover:text-pink-500 transition-colors"
              onClick={() => setIsLoginOpen(true)}
            >
              <User className="w-6 h-6 text-gray-600" />
              <span className="text-gray-600 hidden sm:block font-medium">
                Sign in
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
