// src/pages/HalamanUser/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { Heart, Star, ShoppingCart, ArrowRight, Clock } from 'lucide-react';
import NewsletterPopup from '../../components/HalamanUser/NewsLetterPopup';
import ProductCard from '../../components/HalamanUser/ProductCard';
;


const HomePage = ({ onNavigate }) => {
  const [showNewsletterPopup, setShowNewsletterPopup] = useState(false);

  // Data produk dengan gambar yang sama untuk sementara
  const flashSaleProducts = [
    {
      id: 1,
      name: 'SKINTIFIC Aqua Light Daily Sunscreen SPF 35 PA +++',
      brand: 'SKINTIFIC',
      price: 74100,
      originalPrice: 98800,
      discount: 25,
      rating: 4.8,
      reviews: 1200,
      image: '/src/assets/gambarUser/skintific.png', // Sama semua
      stock: 'Tersisa 299',
      badge: 'SALE'
    },
    {
      id: 2,
      name: 'GLAD2GLOW Milk Amino Acids Gentle Cleanser',
      brand: 'GLAD2GLOW',
      price: 36800,
      originalPrice: 42000,
      discount: 12,
      rating: 4.7,
      reviews: 856,
      image: '/src/assets/gambarUser/skintific.png', // Sama semua
      stock: 'Tersisa 301',
      badge: 'SALE'
    },
    {
      id: 3,
      name: 'DERMA ANGEL Acne Patch Mix 18 DERMA ANGEL Acne Patch Mix 18',
      brand: 'DERMA ANGEL',
      price: 34500,
      originalPrice: 46000,
      discount: 25,
      rating: 4.9,
      reviews: 2340,
      image: '/src/assets/gambarUser/skintific.png', // Sama semua
      stock: 'Tersisa 42',
      badge: '25%'
    },
    {
      id: 4,
      name: 'PURE PAW PAW Ointment - Mini Size PURE PAW PAW Ointment - Mini Size',
      brand: 'PURE PAW PAW',
      price: 46665,
      originalPrice: 54900,
      discount: 15,
      rating: 4.6,
      reviews: 456,
      image: '/src/assets/gambarUser/skintific.png', // Sama semua
      stock: 'Tersisa 28',
      badge: '15%',
      exclusive: true
    },
    {
      id: 5,
      name: 'SKIN1004 Madagascar Centella Light Cleansing Oil',
      brand: 'SKIN1004',
      price: 145000,
      originalPrice: 629000,
      discount: 77,
      rating: 4.8,
      reviews: 934,
      image: '/src/assets/gambarUser/skintific.png', // Sama semua
      stock: 'Segera habis',
      badge: 'SALE'
    }
  ];

  const bestDealsProducts = [
    {
      id: 6,
      name: 'MEDIHEAL Madecassoside Blemish Pad',
      brand: 'MEDIHEAL',
      price: 288150,
      originalPrice: 339000,
      discount: 15,
      rating: 4.8,
      reviews: 208,
      image: '/src/assets/gambarUser/skintific.png', // Sama semua
      options: 'More options available'
    },
    {
      id: 7,
      name: 'MEDIHEAL THE I.P.I Brightening Ampoule Mask',
      brand: 'MEDIHEAL',
      price: 26910,
      originalPrice: 29900,
      discount: 10,
      rating: 4.7,
      reviews: 6300,
      image: '/src/assets/gambarUser/skintific.png', // Sama semua
      award: true
    },
    {
      id: 8,
      name: 'COSRX AHA/BHA Clarifying Treatment Toner',
      brand: 'COSRX',
      price: 160000,
      originalPrice: 200000,
      discount: 20,
      rating: 4.5,
      reviews: 20500,
      image: '/src/assets/gambarUser/skintific.png', // Sama semua
      size: '150 ml'
    },
    {
      id: 9,
      name: 'ACWELL Licorice pH Balancing Cleansing Toner',
      brand: 'ACWELL',
      price: 99000,
      originalPrice: 165000,
      discount: 40,
      rating: 4.6,
      reviews: 1400,
      image: '/src/assets/gambarUser/skintific.png', // Sama semua
      size: '150 ml',
      exclusive: true
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNewsletterPopup(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleClosePopup = () => {
    setShowNewsletterPopup(false);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID').format(price);
  };

  // Komponen untuk render gambar dengan fallback
  const ProductImage = ({ src, alt, className }) => {
    const [imageError, setImageError] = useState(false);
    
    if (imageError) {
      // Fallback ke emoji jika gambar gagal load
      return (
        <div className={`${className} bg-gray-100 flex items-center justify-center`}>
          <span className="text-4xl">💄</span>
        </div>
      );
    }
    
    return (
      <img 
        src={src} 
        alt={alt} 
        className={`${className} object-contain p-4 bg-white`} // object-contain + padding biar logo ga distorsi
        onError={() => setImageError(true)}
        loading="lazy"
      />
    );
  };

  return (
    <>
 
      
      {/* Flash Sale Section */}
      <div className="mb-8">
        {/* Flash Sale Header */}
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
                    Ends in <span className="font-bold text-red-500">10:12:37</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => onNavigate('produk')}
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors font-medium"
              >
                See all
              </button>
            </div>
          </div>
        </div>

        {/* Flash Sale Products */}
        <div className="bg-gradient-to-b from-blue-50 to-blue-100 rounded-xl p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {flashSaleProducts.map((product) => (
              <ProductCard key={product.id} product={product} formatPrice={formatPrice} />
            ))}
          </div>
        </div>
      </div>

      {/* Best Deals Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">More to explore for you, Bestie!</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Value Pack Banner */}
          <div className="lg:row-span-2">
            <div className="bg-gradient-to-br from-pink-400 to-pink-500 text-white rounded-2xl p-6 h-full relative overflow-hidden min-h-[300px] flex flex-col justify-center">
              <div className="absolute -top-4 -right-4 text-8xl opacity-20">🛍️</div>
              <div className="relative z-10">
                <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold mb-4 inline-block">
                  Value Pack
                </div>
                <h3 className="text-2xl font-bold mb-2">BUY</h3>
                <h3 className="text-2xl font-bold mb-2">MORE</h3>
                <h3 className="text-2xl font-bold mb-4">SPEND</h3>
                <h3 className="text-2xl font-bold mb-6">LESS</h3>
                <button 
                  onClick={() => onNavigate('produk')}
                  className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                >
                  SHOP ALL
                </button>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {bestDealsProducts.map((product) => (
                  <ProductCard key={product.id} product={product} formatPrice={formatPrice} />
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