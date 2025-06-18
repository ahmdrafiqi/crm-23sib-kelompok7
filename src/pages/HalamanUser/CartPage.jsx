// src/pages/HalamanUser/CartPage.jsx
import React, { useState, useEffect } from 'react';
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';

const CartPage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

  // Sample products data
  const allProducts = [
    {
      id: 1,
      name: 'SKINTIFIC Aqua Light Daily Sunscreen SPF 35',
      brand: 'SKINTIFIC',
      price: 74100,
      originalPrice: 98800,
      image: '🧴',
      stock: 299
    },
    {
      id: 2,
      name: 'Maybelline SuperStay Matte Ink Liquid Lipstick',
      brand: 'MAYBELLINE',
      price: 89000,
      originalPrice: 120000,
      image: '💄',
      stock: 150
    },
    {
      id: 3,
      name: 'The Body Shop British Rose Body Lotion',
      brand: 'THE BODY SHOP',
      price: 159000,
      originalPrice: 199000,
      image: '🧴',
      stock: 89
    }
  ];

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      const userData = JSON.parse(user);
      setCurrentUser(userData);
      loadCart(userData.id);
    }
    setProducts(allProducts);
  }, []);

  const loadCart = (userId) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const userCart = cart.filter(item => item.userId === userId);
    setCartItems(userCart);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const itemIndex = cart.findIndex(item => 
      item.userId === currentUser.id && item.productId === productId
    );

    if (itemIndex !== -1) {
      cart[itemIndex].quantity = newQuantity;
      cart[itemIndex].updatedAt = new Date().toISOString();
      localStorage.setItem('cart', JSON.stringify(cart));
      loadCart(currentUser.id);
    }
  };

  const removeItem = (productId) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = cart.filter(item => 
      !(item.userId === currentUser.id && item.productId === productId)
    );
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    loadCart(currentUser.id);
  };

  const getProductDetails = (productId) => {
    return products.find(p => p.id === productId);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const product = getProductDetails(item.productId);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shipping = subtotal > 200000 ? 0 : 15000; // Free shipping di atas 200k
    return subtotal + shipping;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID').format(price);
  };

  const proceedToCheckout = () => {
    if (cartItems.length === 0) {
      alert('Keranjang masih kosong');
      return;
    }
    // Navigate to checkout
    if (window.navigateTo) {
      window.navigateTo('checkout');
    }
  };

  if (!currentUser) {
    return (
      <>
        <div className="text-center py-16">
          <div className="text-gray-400 text-6xl mb-4">🔒</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Silakan Login</h3>
          <p className="text-gray-600 mb-6">Anda perlu login untuk melihat keranjang belanja</p>
          <button 
            onClick={() => window.navigateTo && window.navigateTo('home')}
            className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors"
          >
            Kembali ke Home
          </button>
        </div>
      </>
    );
  }

  return (
    <>

        <div className="flex items-center mb-8">
          <button 
            onClick={() => window.navigateTo && window.navigateTo('produk')}
            className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Keranjang Belanja</h1>
            <p className="text-gray-600">{cartItems.length} item dalam keranjang</p>
          </div>
        </div>

        {cartItems.length === 0 ? (
          // Empty Cart
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">🛒</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Keranjang Masih Kosong</h3>
            <p className="text-gray-600 mb-6">Yuk mulai belanja produk kecantikan favorit Anda!</p>
            <button 
              onClick={() => window.navigateTo && window.navigateTo('/produk')}
              className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors inline-flex items-center space-x-2"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Mulai Belanja</span>
            </button>
          </div>
        ) : (
          // Cart Content
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Item Belanja</h2>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {cartItems.map((item) => {
                    const product = getProductDetails(item.productId);
                    if (!product) return null;

                    return (
                      <div key={item.id} className="p-6">
                        <div className="flex items-center space-x-4">
                          {/* Product Image */}
                          <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                            <span className="text-2xl">{product.image}</span>
                          </div>

                          {/* Product Details */}
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-pink-500">Rp{formatPrice(product.price)}</span>
                              {product.originalPrice > product.price && (
                                <span className="text-sm text-gray-400 line-through">
                                  Rp{formatPrice(product.originalPrice)}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              className="p-1 hover:bg-gray-100 rounded"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => removeItem(item.productId)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Ringkasan Pesanan</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({cartItems.length} item)</span>
                    <span className="font-medium">Rp{formatPrice(calculateSubtotal())}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ongkos Kirim</span>
                    <span className="font-medium">
                      {calculateSubtotal() > 200000 ? (
                        <span className="text-green-600">GRATIS</span>
                      ) : (
                        `Rp${formatPrice(15000)}`
                      )}
                    </span>
                  </div>
                  
                  {calculateSubtotal() < 200000 && (
                    <div className="text-sm text-gray-500 bg-blue-50 p-3 rounded-lg">
                      <span className="text-blue-600">💡 Belanja Rp{formatPrice(200000 - calculateSubtotal())} lagi untuk gratis ongkir!</span>
                    </div>
                  )}
                  
                  <hr />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-pink-500">Rp{formatPrice(calculateTotal())}</span>
                  </div>
                </div>

                <button
                  onClick={proceedToCheckout}
                  className="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition-colors font-medium"
                >
                  Lanjut ke Checkout
                </button>

                <button
                  onClick={() => window.navigateTo && window.navigateTo('produk')}
                  className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium mt-3"
                >
                  Lanjut Belanja
                </button>
              </div>
            </div>
          </div>
        )}
      
 
    </>
  );
};

export default CartPage;