import React from 'react';
import { Plus, Percent, Star, Gift } from 'lucide-react';
import UserLayout from '../../components/HalamanUser/UserLayout';

const HomePage = () => {
  const categories = [
    'Eyeliner', 'Eyeliner', 'Eyeliner', 'Eyeliner',
    'Eyeliner', 'Eyeliner', 'Eyeliner', 'Eyeliner',
    'Eyeliner', 'Eyeliner', 'Eyeliner', 'Eyeliner'
  ];

  const products = Array(15).fill(null).map((_, index) => ({
    id: index + 1,
    name: 'Compact Powder',
    price: 'Rp35.000',
    rating: 4.5,
    reviews: `${Math.floor(Math.random() * 100) + 1} pcs`
  }));

  return (
    <UserLayout>
      {/* Hero Banners */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-8">
        {/* Left Banner */}
        <div className="bg-gradient-to-r from-orange-100 to-orange-200 rounded-xl lg:rounded-2xl p-6 lg:p-8 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3 lg:mb-4">
              Premium Beauty Products
            </h2>
            <p className="text-gray-700 mb-4 lg:mb-6 text-sm lg:text-base">
              Discover our exclusive collection of high-quality cosmetics
            </p>
            <button className="bg-orange-500 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-lg hover:bg-orange-600 transition-colors text-sm lg:text-base">
              Shop Now
            </button>
          </div>
          <div className="absolute right-0 top-0 w-32 lg:w-64 h-full bg-gradient-to-l from-orange-300 to-transparent"></div>
        </div>

        {/* Right Banner */}
        <div className="bg-gradient-to-r from-pink-100 to-blue-100 rounded-xl lg:rounded-2xl p-6 lg:p-8 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3 lg:mb-4">
              Makeup Essentials
            </h2>
            <p className="text-gray-700 mb-4 lg:mb-6 text-sm lg:text-base">
              Everything you need for the perfect look
            </p>
            <button className="bg-pink-500 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-lg hover:bg-pink-600 transition-colors text-sm lg:text-base">
              Explore
            </button>
          </div>
          <div className="absolute right-0 top-0 w-32 lg:w-64 h-full bg-gradient-to-l from-pink-300 to-transparent"></div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-8">
        <div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-sm">
          <div className="flex items-center">
            <div className="bg-pink-100 p-2 lg:p-3 rounded-full mr-3 lg:mr-4">
              <Percent className="w-5 h-5 lg:w-6 lg:h-6 text-pink-500" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm lg:text-base">Digital Coupons</h3>
              <p className="text-xs lg:text-sm text-gray-600">Save time & money, Just before you go</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-sm">
          <div className="flex items-center">
            <div className="bg-pink-100 p-2 lg:p-3 rounded-full mr-3 lg:mr-4">
              <Star className="w-5 h-5 lg:w-6 lg:h-6 text-pink-500" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm lg:text-base">Digital Spotlight</h3>
              <p className="text-xs lg:text-sm text-gray-600">Find products easily & navigate store with the app</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-sm">
          <div className="flex items-center">
            <div className="bg-pink-100 p-2 lg:p-3 rounded-full mr-3 lg:mr-4">
              <Gift className="w-5 h-5 lg:w-6 lg:h-6 text-pink-500" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm lg:text-base">Online Promotion</h3>
              <p className="text-xs lg:text-sm text-gray-600">Select an online shopping store to see current offers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="mb-8">
        <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 lg:mb-6">Kategori</h2>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 lg:gap-4">
          {categories.map((category, index) => (
            <div key={index} className="bg-pink-100 rounded-xl lg:rounded-2xl p-3 lg:p-4 text-center hover:bg-pink-200 transition-colors cursor-pointer">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-full mx-auto mb-2 lg:mb-3 flex items-center justify-center">
                <span className="text-pink-500 font-bold text-lg lg:text-xl">💄</span>
              </div>
              <span className="text-gray-700 font-medium text-xs lg:text-sm">{category}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Products Section */}
      <div className="mb-8">
        <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 lg:mb-6">Produk Terlaris</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl lg:rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative">
                <div className="aspect-square bg-pink-50 flex items-center justify-center">
                  <span className="text-2xl lg:text-4xl">💄</span>
                </div>
                <button className="absolute top-2 lg:top-3 right-2 lg:right-3 bg-pink-500 text-white rounded-full w-6 h-6 lg:w-8 lg:h-8 flex items-center justify-center hover:bg-pink-600">
                  <Plus className="w-3 h-3 lg:w-4 lg:h-4" />
                </button>
              </div>
              <div className="p-3 lg:p-4">
                <h3 className="font-semibold text-gray-900 mb-1 text-sm lg:text-base">{product.name}</h3>
                <p className="text-pink-500 font-bold mb-2 text-sm lg:text-base">{product.price}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 lg:w-4 lg:h-4 text-yellow-400 fill-current" />
                    <span className="text-xs lg:text-sm text-gray-600">{product.rating}</span>
                  </div>
                  <span className="text-xs lg:text-sm text-gray-500">{product.reviews}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Get to Know Us Section */}
      <div className="mb-8">
        <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 lg:mb-6">Get to know us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          <div className="bg-gradient-to-br from-pink-200 to-pink-300 rounded-xl lg:rounded-2xl aspect-video"></div>
          <div className="bg-gradient-to-br from-pink-200 to-pink-300 rounded-xl lg:rounded-2xl aspect-video"></div>
          <div className="bg-gradient-to-br from-pink-200 to-pink-300 rounded-xl lg:rounded-2xl aspect-video"></div>
        </div>
      </div>
    </UserLayout>
  );
};

export default HomePage;