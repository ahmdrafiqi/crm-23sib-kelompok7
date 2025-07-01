import React, { useState, useEffect } from "react";
import { Search, ShoppingCart, User, MapPin, ChevronDown } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import LoginPopup from "./LoginPopup";

const Header = ({ activeTab = "home" }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false); // moved here
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    window.location.reload();
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
    <>
      <header className="bg-white shadow-sm">
        <div className="max-w-full mx-auto px-4 lg:px-6">
          <div className="flex items-center h-16">
            {/* Logo dan Search Bar */}
            <div className="flex items-center flex-1">
              <div className="flex items-center mr-8">
                <img
                  src="assets/gambarUser/logo-missglam.png"
                  alt="Miss Glam Logo"
                  className="h-13 w-auto cursor-pointer"
                  onClick={() => navigate("/home")}
                />
              </div>

              <div className="flex-1 max-w-2xl hidden md:block">
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari produk skincare, makeup, bodycare..."
                    className="w-full pl-6 pr-16 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 text-sm placeholder-gray-400"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-6">
              {/* Cart */}
              <div className="flex items-center space-x-2 cursor-pointer hover:text-pink-500 transition-colors">
                <div className="relative">
                  <ShoppingCart className="w-6 h-6 text-gray-600" />
                  {currentUser && getCartCount() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                      {getCartCount()}
                    </span>
                  )}
                </div>
                <a href="/riwayat">
                  <span className="text-gray-600 hidden sm:block font-medium">
                    Cart
                  </span>
                </a>
              </div>

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
                        {/* Foto Profil Bulat Tinggi Sama dengan Konten */}
                        <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-300">
                          <img
                            src="/src/assets/gambarUser/user.jpg" // ganti sesuai path kamu
                            alt="User Avatar"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Info User */}
                        <div className="flex flex-col justify-center">
                          <span className="text-gray-900 text-base font-semibold">
                            {currentUser.username}
                          </span>
                          <span className="text-gray-500 text-sm">
                            {currentUser.email}
                          </span>
                          <NavLink
                            to="/profil"
                            onClick={() => setShowDropdown(false)}
                            className="text-pink-500 hover:underline text-sm font-medium mt-1"
                          >
                            View Profile
                          </NavLink>
                        </div>
                      </div>

                      {/* Membership Box */}
                      <NavLink
                        to="/member"
                        onClick={() => setShowDropdown(false)}
                        className="w-full bg-pink-50 border border-pink-100 rounded-lg p-3 flex flex-col space-y-1 hover:bg-pink-100 transition"
                      >
                        <div className="flex items-center space-x-2 font-semibold text-sm text-gray-800">
                          <span className="text-orange-500 text-lg">♥</span>
                          <span>Glam Babe (Bronze)</span>
                        </div>
                      </NavLink>

                      {/* Menu Items */}
                      <div className="space-y-2 text-gray-700">
                        <NavLink
                          to="/riwayat"
                          onClick={() => setShowDropdown(false)}
                          className="flex items-center space-x-2 hover:text-pink-500"
                        >
                          <span>Riwayat</span>
                        </NavLink>
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

          {/* Navigation Menu */}
          <div className="border-t border-gray-200">
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center space-x-8">
                <NavLink
                  to="/home"
                  className={({ isActive }) =>
                    `font-medium transition-colors ${
                      isActive
                        ? "text-pink-500 border-b-2 border-pink-500 pb-1"
                        : "text-gray-700 hover:text-pink-500"
                    }`
                  }
                >
                  Home
                </NavLink>

                <NavLink
                  to="/product"
                  className={({ isActive }) =>
                    `font-medium transition-colors ${
                      isActive
                        ? "text-pink-500 border-b-2 border-pink-500 pb-1"
                        : "text-gray-700 hover:text-pink-500"
                    }`
                  }
                >
                  Produk
                </NavLink>

                <NavLink
                  to="/riwayat"
                  className={({ isActive }) =>
                    `font-medium transition-colors ${
                      isActive
                        ? "text-pink-500 border-b-2 border-pink-500 pb-1"
                        : "text-gray-700 hover:text-pink-500"
                    }`
                  }
                >
                  Riwayat
                </NavLink>
              </div>

              <div className="flex items-center space-x-2 text-gray-600 text-sm">
                <MapPin className="w-4 h-4" />
                {currentUser ? (
                  <>
                    <span className="hidden sm:block">Delivery:</span>
                    <span className="font-medium">Rumbai, Pekanbaru</span>
                  </>
                ) : (
                  <span className="font-medium">&nbsp;</span>
                )}
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <LoginPopup isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
};

export default Header;
