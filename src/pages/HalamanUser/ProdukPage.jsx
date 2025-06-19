import React, { useState, useEffect } from 'react';
import { Filter, ChevronDown, Heart, Star, ShoppingCart, Grid, List, Tag } from 'lucide-react';
import ProductCard from '../../components/HalamanUser/ProductCard';

const ProdukPage = ({ onNavigate }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [currentUser, setCurrentUser] = useState(null);

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

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        case 'newest': return b.isNew - a.isNew;
        default: return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [selectedCategory, sortBy, products]);

  const formatPrice = (price) => new Intl.NumberFormat('id-ID').format(price);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">Produk Kecantikan</h1>
        <p className="text-gray-600 text-sm">Temukan produk skincare, makeup, dan bodycare terbaik untuk kamu ✨</p>
      </div>

      {/* Filter & Sort */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-10 border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-6 justify-between">
          {/* Kategori */}
          <div className="flex-1">
            <h2 className="text-sm font-semibold text-gray-700 mb-3">Kategori</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`flex items-center justify-between px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all
                    ${
                      selectedCategory === category.value
                        ? 'bg-pink-100 border-pink-500 text-pink-700'
                        : 'border-gray-200 text-gray-700 hover:border-pink-300'
                    }`}
                >
                  <span className="flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    {category.label}
                  </span>
                  <span className="text-xs text-gray-500">({category.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sorting + View Mode */}
          <div className="lg:w-80 space-y-4">
            {/* Sorting */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Urutkan</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
              >
                <option value="name">Nama A-Z</option>
                <option value="price-low">Harga Terendah</option>
                <option value="price-high">Harga Tertinggi</option>
                <option value="rating">Rating Tertinggi</option>
                <option value="newest">Produk Terbaru</option>
              </select>
            </div>

            {/* Tampilan grid/list */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tampilan</label>
              <div className="inline-flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-pink-500 text-white' : 'hover:bg-gray-100 text-gray-600'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-pink-500 text-white' : 'hover:bg-gray-100 text-gray-600'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Produk */}
      <div className={`grid gap-6 ${
        viewMode === 'grid'
          ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
          : 'grid-cols-1'
      }`}>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} formatPrice={formatPrice} />
        ))}
      </div>

      {/* Produk Tidak Ditemukan */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Produk tidak ditemukan</h3>
          <p className="text-gray-600">Coba ubah filter atau kata kunci pencarian Anda</p>
        </div>
      )}
    </div>
  );
};

export default ProdukPage;
