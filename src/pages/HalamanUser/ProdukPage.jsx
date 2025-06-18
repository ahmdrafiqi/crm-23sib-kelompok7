// src/pages/HalamanUser/ProdukPage.jsx
import React, { useState, useEffect } from 'react';
import { Filter, ChevronDown, Heart, Star, ShoppingCart, Grid, List } from 'lucide-react';
import UserLayout from '../../components/HalamanUser/UserLayout';

const ProdukPage = ({ onNavigate }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [currentUser, setCurrentUser] = useState(null);

  // Simulasi data produk dengan gambar yang sama
  const allProducts = [
    {
      id: 1,
      name: 'SKINTIFIC Aqua Light Daily Sunscreen SPF 35',
      brand: 'SKINTIFIC',
      category: 'skincare',
      price: 74100,
      originalPrice: 98800,
      discount: 25,
      rating: 4.8,
      reviews: 1200,
      image: '/src/assets/gambarUser/skintific.png', // Sama semua
      isNew: false,
      isBestseller: true
    },
    {
      id: 2,
      name: 'Maybelline SuperStay Matte Ink Liquid Lipstick',
      brand: 'MAYBELLINE',
      category: 'makeup',
      price: 89000,
      originalPrice: 120000,
      discount: 26,
      rating: 4.6,
      reviews: 2500,
      image: '/src/assets/gambarUser/skintific.png', // Sama semua
      isNew: true,
      isBestseller: false
    },
    {
      id: 3,
      name: 'The Body Shop British Rose Body Lotion',
      brand: 'THE BODY SHOP',
      category: 'bodycare',
      price: 159000,
      originalPrice: 199000,
      discount: 20,
      rating: 4.7,
      reviews: 890,
      image: '/src/assets/gambarUser/skintific.png', // Sama semua
      isNew: false,
      isBestseller: true
    },
    {
      id: 4,
      name: 'COSRX Advanced Snail 96 Mucin Power Essence',
      brand: 'COSRX',
      category: 'skincare',
      price: 185000,
      originalPrice: 220000,
      discount: 16,
      rating: 4.9,
      reviews: 3200,
      image: '/src/assets/gambarUser/skintific.png', // Sama semua
      isNew: false,
      isBestseller: true
    },
    {
      id: 5,
      name: 'Urban Decay Naked Heat Eyeshadow Palette',
      brand: 'URBAN DECAY',
      category: 'makeup',
      price: 650000,
      originalPrice: 780000,
      discount: 17,
      rating: 4.8,
      reviews: 1100,
      image: '/src/assets/gambarUser/skintific.png', // Sama semua
      isNew: true,
      isBestseller: false
    },
    {
      id: 6,
      name: 'Cetaphil Gentle Skin Cleanser',
      brand: 'CETAPHIL',
      category: 'skincare',
      price: 125000,
      originalPrice: 150000,
      discount: 17,
      rating: 4.5,
      reviews: 1800,
      image: '/src/assets/gambarUser/skintific.png', // Sama semua
      isNew: false,
      isBestseller: true
    },
    {
      id: 7,
      name: 'Bath & Body Works Japanese Cherry Blossom',
      brand: 'BATH & BODY WORKS',
      category: 'bodycare',
      price: 299000,
      originalPrice: 350000,
      discount: 15,
      rating: 4.6,
      reviews: 750,
      image: '/src/assets/gambarUser/skintific.png', // Sama semua
      isNew: true,
      isBestseller: false
    },
    {
      id: 8,
      name: 'Fenty Beauty Gloss Bomb Universal Lip Luminizer',
      brand: 'FENTY BEAUTY',
      category: 'makeup',
      price: 285000,
      originalPrice: 320000,
      discount: 11,
      rating: 4.7,
      reviews: 1950,
      image: '/src/assets/gambarUser/skintific.png', // Sama semua
      isNew: false,
      isBestseller: true
    }
  ];

  const categories = [
    { value: 'all', label: 'Semua Produk', count: allProducts.length },
    { value: 'skincare', label: 'Skincare', count: allProducts.filter(p => p.category === 'skincare').length },
    { value: 'makeup', label: 'Makeup', count: allProducts.filter(p => p.category === 'makeup').length },
    { value: 'bodycare', label: 'Bodycare', count: allProducts.filter(p => p.category === 'bodycare').length }
  ];

  useEffect(() => {
    setProducts(allProducts);
    setFilteredProducts(allProducts);
    
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  useEffect(() => {
    let filtered = selectedCategory === 'all' 
      ? products 
      : products.filter(product => product.category === selectedCategory);

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return b.isNew - a.isNew;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [selectedCategory, sortBy, products]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID').format(price);
  };

  const addToCart = (productId) => {
    if (!currentUser) {
      alert('Silakan login terlebih dahulu');
      return;
    }

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.userId === currentUser.id && item.productId === productId);

    if (existingItem) {
      existingItem.quantity += 1;
      existingItem.updatedAt = new Date().toISOString();
    } else {
      cart.push({
        id: Date.now(),
        userId: currentUser.id,
        productId,
        quantity: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Produk berhasil ditambahkan ke keranjang!');
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
        className={`${className} object-contain p-4 bg-white`}
        onError={() => setImageError(true)}
        loading="lazy"
      />
    );
  };

  return (
    <UserLayout activeTab="produk" onNavigate={onNavigate}>
      <div className="mb-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Produk Kecantikan</h1>
          <p className="text-gray-600">Temukan produk kecantikan terbaik untuk kebutuhan Anda</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Category Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-3">Kategori</label>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`p-3 rounded-lg border-2 transition-all text-sm font-medium ${
                      selectedCategory === category.value
                        ? 'border-pink-500 bg-pink-50 text-pink-700'
                        : 'border-gray-200 hover:border-pink-300 text-gray-700'
                    }`}
                  >
                    {category.label}
                    <span className="block text-xs text-gray-500 mt-1">({category.count})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sort & View Options */}
            <div className="lg:w-80">
              <div className="flex gap-4">
                {/* Sort */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Urutkan</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  >
                    <option value="name">Nama A-Z</option>
                    <option value="price-low">Harga Terendah</option>
                    <option value="price-high">Harga Tertinggi</option>
                    <option value="rating">Rating Tertinggi</option>
                    <option value="newest">Terbaru</option>
                  </select>
                </div>

                {/* View Mode */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Tampilan</label>
                  <div className="flex border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-3 ${viewMode === 'grid' ? 'bg-pink-500 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-3 ${viewMode === 'list' ? 'bg-pink-500 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6' 
            : 'grid-cols-1'
        }`}>
          {filteredProducts.map((product) => (
            <div key={product.id} className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all ${
              viewMode === 'list' ? 'flex' : ''
            }`}>
              <div className={`relative ${viewMode === 'list' ? 'w-48' : ''}`}>
                <div className={`${
                  viewMode === 'list' ? 'h-48' : 'aspect-square'
                }`}>
                  <ProductImage 
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full"
                  />
                </div>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  {product.discount > 0 && (
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                      -{product.discount}%
                    </span>
                  )}
                  {product.isNew && (
                    <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
                      NEW
                    </span>
                  )}
                  {product.isBestseller && (
                    <span className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-bold">
                      BEST
                    </span>
                  )}
                </div>

                <button className="absolute top-3 right-3 bg-white bg-opacity-80 p-2 rounded-full shadow hover:bg-opacity-100 transition-all">
                  <Heart className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <div className="text-xs text-gray-500 mb-1 uppercase font-medium">{product.brand}</div>
                <h3 className={`font-semibold text-gray-900 mb-2 ${
                  viewMode === 'list' ? 'text-lg' : 'text-sm'
                } line-clamp-2`}>
                  {product.name}
                </h3>

                <div className="flex items-center space-x-1 mb-3">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-xs text-gray-500">({product.reviews})</span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-pink-500 font-bold text-lg">
                      Rp{formatPrice(product.price)}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-gray-400 line-through text-sm">
                        Rp{formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => addToCart(product.id)}
                  className="w-full bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors font-medium flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Tambah ke Keranjang</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Products Found */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Produk tidak ditemukan</h3>
            <p className="text-gray-600">Coba ubah filter atau kata kunci pencarian Anda</p>
          </div>
        )}
      </div>
    </UserLayout>
  );
};

export default ProdukPage;