// src/components/HalamanUser/Header.jsx
import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, MapPin, ChevronDown, LogOut } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import LoginPopup from './LoginPopup';

const Header = ({ activeTab = 'home' }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
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
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const userCart = cart.filter(item => item.userId === currentUser.id);
    return userCart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <>
      <header className="bg-white shadow-sm">
        {/* Top Navigation */}
        <div className="max-w-full mx-auto px-4 lg:px-6">
          <div className="flex items-center h-16">
            {/* Logo dan Search Bar */}
            <div className="flex items-center flex-1">
              {/* Logo */}
              <div className="flex items-center mr-8">
                <img 
                  src="/src/assets/gambarUser/logo-missglam.png" 
                  alt="Miss Glam Logo" 
                  className="h-13 w-auto cursor-pointer"
                  onClick={() => navigate('/home')}
                />
              </div>

              {/* Search Bar */}
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
                  {currentUser && (
                    <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                      {getCartCount()}
                    </span>
                  )}
                </div>
                <span className="text-gray-600 hidden sm:block font-medium">Cart</span>
              </div>

              {/* User Account */}
              {currentUser ? (
                <div className="flex items-center space-x-2 relative group">
                  <User className="w-6 h-6 text-gray-600" />
                  <span className="text-gray-600 hidden sm:block font-medium">Hi, {currentUser.name}</span>
                  
                  {/* Dropdown */}
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="p-4 border-b border-gray-200">
                      <p className="font-medium text-gray-900">{currentUser.name}</p>
                      <p className="text-sm text-gray-500">{currentUser.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div 
                  className="flex items-center space-x-2 cursor-pointer hover:text-pink-500 transition-colors"
                  onClick={() => setIsLoginOpen(true)}
                >
                  <User className="w-6 h-6 text-gray-600" />
                  <span className="text-gray-600 hidden sm:block font-medium">Sign in</span>
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
                      isActive ? 'text-pink-500 border-b-2 border-pink-500 pb-1' : 'text-gray-700 hover:text-pink-500'
                    }`
                  }
                >
                  Home
                </NavLink>

                <NavLink 
                  to="/product"
                  className={({ isActive }) =>
                    `font-medium transition-colors ${
                      isActive ? 'text-pink-500 border-b-2 border-pink-500 pb-1' : 'text-gray-700 hover:text-pink-500'
                    }`
                  }
                >
                  Produk
                </NavLink>

                <NavLink 
                  to="/riwayat"
                  className={({ isActive }) =>
                    `font-medium transition-colors ${
                      isActive ? 'text-pink-500 border-b-2 border-pink-500 pb-1' : 'text-gray-700 hover:text-pink-500'
                    }`
                  }
                >
                  Riwayat
                </NavLink>

                <NavLink 
                  to="/cart"
                  className={({ isActive }) =>
                    `font-medium transition-colors ${
                      isActive ? 'text-pink-500 border-b-2 border-pink-500 pb-1' : 'text-gray-700 hover:text-pink-500'
                    }`
                  }
                >
                  Suka
                </NavLink>

                <NavLink 
                  to="/checkout"
                  className={({ isActive }) =>
                    `font-medium transition-colors ${
                      isActive ? 'text-pink-500 border-b-2 border-pink-500 pb-1' : 'text-gray-700 hover:text-pink-500'
                    }`
                  }
                >
                  Checkout
                </NavLink>
              </div>

              <div className="flex items-center space-x-2 text-gray-600 text-sm">
                <MapPin className="w-4 h-4" />
                <span className="hidden sm:block">Delivery:</span>
                <span className="font-medium">Address</span>
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
