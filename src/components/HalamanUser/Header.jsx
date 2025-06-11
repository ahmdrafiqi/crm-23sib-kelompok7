import React from 'react';
import { Search, ShoppingCart, User, MapPin, ChevronDown } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      {/* Top Navigation */}
      <div className="max-w-full mx-auto px-4 lg:px-6">
        <div className="flex items-center h-16">
          {/* Logo dan Search Bar (kiri) */}
          <div className="flex items-center flex-1">
            {/* Logo */}
            <div className="flex items-center mr-6">
              <img 
                src="/src/assets/gambarUser/logo-missglam.png" 
                alt="Miss Glam Logo" 
                className="h-15 w-auto"
              />
            </div>

            {/* Search Bar - dekat dengan logo */}
            <div className="max-w-lg hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search our products from here"
                  className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
                <button className="absolute right-0 top-0 h-full px-4 bg-pink-500 text-white rounded-r-lg hover:bg-pink-600">
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Side Icons (kanan) */}
          <div className="flex items-center space-x-6">
            {/* Cart */}
            <div className="flex items-center space-x-2 cursor-pointer hover:text-pink-500">
              <div className="relative">
                <ShoppingCart className="w-6 h-6 text-gray-600" />
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
              </div>
              <span className="text-gray-600 hidden sm:block">Cart</span>
            </div>

            {/* Sign In */}
            <div className="flex items-center space-x-2 cursor-pointer hover:text-pink-500">
              <User className="w-6 h-6 text-gray-600" />
              <span className="text-gray-600 hidden sm:block">Sign in</span>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="border-t border-gray-200">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-6">
              <a href="#" className="text-gray-700 hover:text-pink-500">Home</a>
              <a href="#" className="text-gray-700 hover:text-pink-500">Kategori</a>
              <a href="#" className="text-gray-700 hover:text-pink-500">Riwayat</a>
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
  );
};

export default Header;