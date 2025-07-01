// src/pages/HalamanUser/HomePage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Star, ShoppingCart, ArrowRight, Clock, MessageCircle, Edit3 } from "lucide-react";
import NewsletterPopup from "../../components/HalamanUser/NewsLetterPopup";
import ProductCard from "../../components/HalamanUser/ProductCard";
import { allProducts } from "../../data/produk";


const HomePage = ({ onNavigate }) => {
  const navigate = useNavigate();
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
              <div className="absolute -top-4 -right-4 text-8xl opacity-20 animate-pulse">🛍</div>
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

      {/* 💬 User Reviews Section */}
      <div className="mb-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            What Our Besties Say 💕
          </h2>
          <p className="text-gray-600">Real reviews from real customers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Review 1 */}
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 border border-pink-100 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                S
              </div>
              <div className="ml-3">
                <h4 className="font-semibold text-gray-900">Sarah M.</h4>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed mb-3">
              "Produk skincare di sini benar-benar amazing! Kulit jadi lebih glowing dan sehat.
              Packaging-nya juga super cute, cocok banget buat gift!"
            </p>
            <div className="text-xs text-pink-500 font-medium">Verified Purchase ✓</div>
          </div>

          {/* Review 2 */}
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-100 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                A
              </div>
              <div className="ml-3">
                <h4 className="font-semibold text-gray-900">Ayu K.</h4>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed mb-3">
              "Fast delivery dan customer service yang ramah banget!
              Makeup products-nya berkualitas tinggi dengan harga yang reasonable. Love it! 💄"
            </p>
            <div className="text-xs text-purple-500 font-medium">Verified Purchase ✓</div>
          </div>

          {/* Review 3 */}
          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border border-orange-100 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                D
              </div>
              <div className="ml-3">
                <h4 className="font-semibold text-gray-900">Dina R.</h4>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed mb-3">
              "Suka banget sama variety produk di sini! Dari skincare basic sampai makeup premium ada semua.
              Flash sale-nya juga sering dan worthit banget! 🛍"
            </p>
            <div className="text-xs text-orange-500 font-medium">Verified Purchase ✓</div>
          </div>

          {/* Review 4 */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                M
              </div>
              <div className="ml-3">
                <h4 className="font-semibold text-gray-900">Maya L.</h4>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed mb-3">
              "Website-nya user friendly banget dan proses checkout cepet.
              Barang sampai sesuai ekspektasi dan packagingnya rapi. Recommended! ✨"
            </p>
            <div className="text-xs text-green-500 font-medium">Verified Purchase ✓</div>
          </div>

          {/* Review 5 */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                R
              </div>
              <div className="ml-3">
                <h4 className="font-semibold text-gray-900">Rina P.</h4>
                <div className="flex text-yellow-400">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                  <Star className="w-4 h-4 text-gray-300" />
                </div>
              </div>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed mb-3">
              "Produknya original dan harga bersaing. Cuma pengiriman agak lama ke daerah saya,
              tapi overall puas banget sama kualitas produknya! 🌟"
            </p>
            <div className="text-xs text-blue-500 font-medium">Verified Purchase ✓</div>
          </div>

          {/* Review 6 */}
          <div className="bg-gradient-to-br from-violet-50 to-fuchsia-50 rounded-2xl p-6 border border-violet-100 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-400 to-fuchsia-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                L
              </div>
              <div className="ml-3">
                <h4 className="font-semibold text-gray-900">Lina S.</h4>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed mb-3">
              "Customer service responsif banget! Sempat ada masalah dengan pesanan tapi langsung dihandle dengan baik.
              Trust banget belanja di sini! 💖"
            </p>
            <div className="text-xs text-violet-500 font-medium">Verified Purchase ✓</div>
          </div>
        </div>

        {/* Review Summary */}
        <div className="mt-8 bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100 rounded-xl p-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="text-2xl font-bold text-gray-900">4.8</span>
                <span className="text-gray-600">/ 5.0</span>
              </div>
              <p className="text-sm text-gray-600">Based on 2,847+ reviews</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-600">98%</div>
                <div className="text-xs text-gray-600">Satisfied</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">24H</div>
                <div className="text-xs text-gray-600">Fast Delivery</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">5K+</div>
                <div className="text-xs text-gray-600">Happy Customers</div>
              </div>
            </div>
          </div>
        </div>



        {/* 💌 Call to Action for Feedback */}
        <div className="mt-8 bg-gradient-to-br from-pink-100 via-pink-200 to-rose-100 rounded-2xl p-8 text-pink-700 relative overflow-hidden shadow-md">
          {/* Background bubbles */}
          <div className="absolute -top-10 -left-10 w-36 h-36 bg-white opacity-20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-white opacity-10 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl opacity-10">💬</div>

          <div className="relative z-10 text-center">
            <MessageCircle className="w-12 h-12 mx-auto mb-4 text-pink-400" />
            <h3 className="text-3xl font-bold mb-2 text-pink-600">
              Bagaimana Pengalaman Belanjamu? 💖
            </h3>
            <p className="text-base text-pink-500 mb-6 max-w-xl mx-auto">
              Kami ingin mendengar ceritamu! Kirimkan review dan bantu bestie lain memilih produk terbaik ✨
            </p>

            {/* Tombol Ditengah */}
            <div className="flex justify-center">
              <button
                onClick={() => navigate("/feedback")}
                className="bg-white text-pink-600 px-8 py-3 rounded-full font-semibold hover:bg-pink-50 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 shadow"
              >
                <Edit3 className="w-5 h-5" />
                <span>Tulis Review Kamu</span>
              </button>
            </div>

            {/* Keunggulan */}
            <div className="mt-6 flex justify-center space-x-6 text-sm text-pink-400">
              <span>📝 Mudah & cepat</span>
              <span>🎁 Hadiah menarik</span>
              <span>💌 Bantu bestie lain</span>
            </div>
          </div>
        </div>

        {/* ❓ Frequently Asked Questions */}
        <div className="mb-16 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-6">
            Pertanyaan yang Sering Diajukan (FAQ)
          </h2>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow p-6 border border-pink-100">
              <h4 className="font-semibold text-pink-600 mb-2">Bagaimana cara melakukan pemesanan?</h4>
              <p className="text-gray-700 text-sm">
                Kamu bisa langsung memilih produk favoritmu, klik “Tambah ke Keranjang”, lalu lanjut ke checkout untuk menyelesaikan pembayaran.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 border border-pink-100">
              <h4 className="font-semibold text-pink-600 mb-2">Apakah produk di sini asli?</h4>
              <p className="text-gray-700 text-sm">
                Tentu saja! Semua produk yang kami jual 100% original dan langsung dari distributor resmi.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 border border-pink-100">
              <h4 className="font-semibold text-pink-600 mb-2">Berapa lama pengiriman pesanan saya?</h4>
              <p className="text-gray-700 text-sm">
                Pengiriman biasanya memakan waktu 1-3 hari kerja tergantung lokasi. Kami juga menyediakan opsi ekspedisi instan di kota tertentu.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 border border-pink-100">
              <h4 className="font-semibold text-pink-600 mb-2">Apakah saya bisa membatalkan pesanan?</h4>
              <p className="text-gray-700 text-sm">
                Pembatalan hanya bisa dilakukan sebelum pesanan diproses. Hubungi customer service kami sesegera mungkin untuk bantuan.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 border border-pink-100">
              <h4 className="font-semibold text-pink-600 mb-2">Bagaimana jika produk yang saya terima rusak?</h4>
              <p className="text-gray-700 text-sm">
                Kami akan bantu proses retur atau penukaran jika kamu menerima produk rusak. Pastikan untuk menyertakan bukti foto dan laporkan dalam 2x24 jam setelah menerima barang.
              </p>
            </div>
             <div className="bg-white rounded-xl shadow p-6 border border-pink-100">
              <h4 className="font-semibold text-pink-600 mb-2">Bagaimana jika produk yang saya terima rusak?</h4>
              <p className="text-gray-700 text-sm">
                Kami akan bantu proses retur atau penukaran jika kamu menerima produk rusak. Pastikan untuk menyertakan bukti foto dan laporkan dalam 2x24 jam setelah menerima barang.
              </p>
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