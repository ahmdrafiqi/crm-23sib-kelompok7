import React, { useState, useEffect } from 'react';
import {
  Filter,
  ChevronDown,
  Heart,
  Star,
  ShoppingCart,
  Grid,
  List,
  Tag,
  Search
} from 'lucide-react';
import ProductCard from '../../components/HalamanUser/ProductCard';
import { allProducts, categories } from '../../data/produk';

const ProdukPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

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

    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

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
  }, [selectedCategory, sortBy, products, searchQuery]);

  const formatPrice = (price) => new Intl.NumberFormat('id-ID').format(price);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      {/* Filter Area */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-10 border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Search Input */}
          <div className="lg:w-1/3 w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">Cari Produk</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Nama produk atau brand..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all text-sm placeholder-gray-400"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Kategori */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Kategori</label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`flex items-center justify-between px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all
                    ${
                      selectedCategory === category.value
                        ? 'bg-pink-100 border-pink-500 text-pink-700'
                        : 'border-gray-200 text-gray-700 hover:border-pink-300 hover:bg-pink-50'
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
        </div>
      </div>

      {/* Produk Grid */}
      <div className={`grid gap-6 ${
        viewMode === 'grid'
          ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
          : 'grid-cols-1'
      }`}>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} formatPrice={formatPrice} />
        ))}
      </div>

      {/* Jika Produk Kosong */}
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
