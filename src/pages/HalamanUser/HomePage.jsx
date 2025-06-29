// src/pages/HalamanUser/HomePage.jsx
import React, { useState, useEffect } from "react";
import { Heart, Star, ShoppingCart, ArrowRight, Clock } from "lucide-react";
import NewsletterPopup from "../../components/HalamanUser/NewsLetterPopup";
import ProductCard from "../../components/HalamanUser/ProductCard";
import { allProducts } from "../../data/produk";


const HomePage = ({ onNavigate }) => {
  const [showNewsletterPopup, setShowNewsletterPopup] = useState(false);
  const [flashTime, setFlashTime] = useState(600); // 10 menit

  const flashSaleProducts = allProducts.filter((p) => p.isNew);
  const bestDealsProducts = allProducts.filter((p) => p.isBestseller);

  // Countdown Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setFlashTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 600));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  // Newsletter Popup
  useEffect(() => {
    const timer = setTimeout(() => setShowNewsletterPopup(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleClosePopup = () => setShowNewsletterPopup(false);
  const formatPrice = (price) =>
    new Intl.NumberFormat("id-ID").format(price);

  return (
    <>
      {/* 📢 Banner Promosi Utama */}
      <div className="mb-6">
        <div className="rounded-xl bg-gradient-to-r from-pink-300 via-red-300 to-orange-300 p-6 shadow-lg flex flex-col md:flex-row items-center justify-between text-white">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">✨ Mid-Year Beauty Festival ✨</h2>
            <p className="mt-2 text-sm md:text-base">
              Diskon hingga <span className="font-bold">70%</span> untuk skincare, makeup, dan lainnya!
            </p>
          </div>
          <button
            onClick={() => onNavigate("produk")}
            className="mt-4 md:mt-0 bg-white text-pink-500 px-5 py-2 rounded-full text-sm font-semibold hover:bg-yellow-50 transition"
          >
            Lihat Promo
          </button>
        </div>
      </div>

      {/* 🔥 Flash Sale */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-xl p-1 mb-6">
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-yellow-400 to-pink-500 text-white px-4 py-2 rounded-full font-bold text-sm">
                  ONLINE SPECIAL ⚡FLASH SALE
                </div>
                <div className="text-sm">
                  <div className="font-medium text-gray-900">Now Live</div>
                  <div className="text-gray-600">
                    Ends in{" "}
                    <span className="font-bold text-red-500">
                      {formatTime(flashTime)}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => onNavigate("produk")}
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors font-medium"
              >
                See all
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-b from-blue-50 to-blue-100 rounded-xl p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {flashSaleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                formatPrice={formatPrice}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 💎 Best Deals */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          More to explore for you, Bestie!
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 🎁 Banner */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-pink-400 to-pink-500 text-white rounded-2xl p-6 min-h-[300px] h-full relative overflow-hidden flex flex-col justify-between shadow-xl transition-all duration-300 hover:scale-[1.01]">
              <div className="absolute w-48 h-48 bg-white opacity-10 rounded-full -top-10 -left-10 blur-2xl"></div>
              <div className="absolute w-32 h-32 bg-white opacity-10 rounded-full -bottom-12 -right-8 blur-2xl"></div>
              <div className="absolute -top-4 -right-4 text-8xl opacity-20 animate-pulse">🛍️</div>
              <div className="relative z-10">
                <div className="bg-red-500 text-white px-4 py-1 rounded-full text-xs font-bold mb-4 inline-block shadow-md">
                  🔥 Value Pack
                </div>
                <h3 className="text-3xl font-extrabold leading-snug tracking-wide">
                  BUY <br /> MORE <br />
                  <span className="text-yellow-200">SPEND</span> LESS
                </h3>
                <p className="mt-2 text-sm text-pink-100 italic">
                  Get the best bundles at a special price!
                </p>
              </div>
              <div className="relative z-10 mt-6">
                <button
                  onClick={() => onNavigate("produk")}
                  className="bg-white text-pink-600 px-6 py-2 rounded-lg hover:bg-pink-100 transition-colors font-semibold shadow-md"
                >
                  🛒 SHOP ALL
                </button>
              </div>
            </div>
          </div>

          {/* Grid Produk */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {bestDealsProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  formatPrice={formatPrice}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Popup */}
      <NewsletterPopup
        isOpen={showNewsletterPopup}
        onClose={handleClosePopup}
      />
    </>
  );
};

export default HomePage;
