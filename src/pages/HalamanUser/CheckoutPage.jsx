// src/pages/HalamanUser/CheckoutPage.jsx
import React, { useState, useEffect } from 'react';
import { MapPin, CreditCard, Truck, ArrowLeft, CheckCircle } from 'lucide-react';
import UserLayout from '../../components/HalamanUser/UserLayout';

const CheckoutPage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    // Shipping Address
    fullName: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    notes: '',
    // Payment
    paymentMethod: 'cod',
    // Shipping
    shippingMethod: 'regular'
  });

  const allProducts = [
    {
      id: 1,
      name: 'SKINTIFIC Aqua Light Daily Sunscreen SPF 35',
      brand: 'SKINTIFIC',
      price: 74100,
      image: '🧴'
    },
    {
      id: 2,
      name: 'Maybelline SuperStay Matte Ink Liquid Lipstick',
      brand: 'MAYBELLINE',
      price: 89000,
      image: '💄'
    },
    {
      id: 3,
      name: 'The Body Shop British Rose Body Lotion',
      brand: 'THE BODY SHOP',
      price: 159000,
      image: '🧴'
    }
  ];

  const paymentMethods = [
    { id: 'cod', name: 'Cash on Delivery (COD)', icon: '💵', fee: 0 },
    { id: 'transfer', name: 'Transfer Bank', icon: '🏦', fee: 0 },
    { id: 'ewallet', name: 'E-Wallet (GoPay, OVO, DANA)', icon: '📱', fee: 0 },
    { id: 'credit', name: 'Kartu Kredit', icon: '💳', fee: 2500 }
  ];

  const shippingMethods = [
    { id: 'regular', name: 'Reguler (3-5 hari)', price: 15000, icon: '📦' },
    { id: 'express', name: 'Express (1-2 hari)', price: 25000, icon: '⚡' },
    { id: 'sameday', name: 'Same Day (Hari ini)', price: 35000, icon: '🚀' }
  ];

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      const userData = JSON.parse(user);
      setCurrentUser(userData);
      loadCart(userData.id);
      
      // Pre-fill form with user data
      setFormData(prev => ({
        ...prev,
        fullName: userData.name,
        phone: userData.phone || '',
      }));
    }
    setProducts(allProducts);
  }, []);

  const loadCart = (userId) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const userCart = cart.filter(item => item.userId === userId);
    setCartItems(userCart);
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

  const getShippingCost = () => {
    const subtotal = calculateSubtotal();
    if (subtotal > 200000) return 0; // Free shipping
    
    const method = shippingMethods.find(m => m.id === formData.shippingMethod);
    return method ? method.price : 15000;
  };

  const getPaymentFee = () => {
    const method = paymentMethods.find(m => m.id === formData.paymentMethod);
    return method ? method.fee : 0;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + getShippingCost() + getPaymentFee();
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID').format(price);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    const required = ['fullName', 'phone', 'address', 'city', 'postalCode'];
    const missing = required.filter(field => !formData[field].trim());
    
    if (missing.length > 0) {
      alert(`Mohon lengkapi: ${missing.join(', ')}`);
      return;
    }

    // Create order
    const orderData = {
      id: `ORDER-${Date.now()}`,
      userId: currentUser.id,
      items: cartItems.map(item => {
        const product = getProductDetails(item.productId);
        return {
          productId: item.productId,
          productName: product.name,
          quantity: item.quantity,
          price: product.price
        };
      }),
      shippingAddress: {
        fullName: formData.fullName,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        notes: formData.notes
      },
      paymentMethod: formData.paymentMethod,
      shippingMethod: formData.shippingMethod,
      subtotal: calculateSubtotal(),
      shippingCost: getShippingCost(),
      paymentFee: getPaymentFee(),
      totalAmount: calculateTotal(),
      status: 'processing',
      orderDate: new Date().toISOString()
    };

    // Save order
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(orderData);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Clear cart
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = cart.filter(item => item.userId !== currentUser.id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    alert('Pesanan berhasil dibuat!');
    
    // Navigate to success page or order history
    if (window.navigateTo) {
      window.navigateTo('riwayat');
    }
  };

  if (!currentUser || cartItems.length === 0) {
    return (
      <UserLayout activeTab="checkout">
        <div className="text-center py-16">
          <div className="text-gray-400 text-6xl mb-4">🛒</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Keranjang Kosong</h3>
          <p className="text-gray-600 mb-6">Silakan tambahkan produk ke keranjang terlebih dahulu</p>
          <button 
            onClick={() => window.navigateTo && window.navigateTo('produk')}
            className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors"
          >
            Mulai Belanja
          </button>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout activeTab="checkout">
      <div className="mb-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button 
            onClick={() => window.navigateTo && window.navigateTo('cart')}
            className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
            <p className="text-gray-600">Lengkapi informasi pesanan Anda</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Address */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center mb-6">
                  <MapPin className="w-5 h-5 text-pink-500 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-900">Alamat Pengiriman</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Telepon *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                      required
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Alamat Lengkap *</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Kota *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Kode Pos *</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                      required
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Catatan (Opsional)</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows="2"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    placeholder="Instruksi khusus untuk kurir"
                  />
                </div>
              </div>

              {/* Shipping Method */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center mb-6">
                  <Truck className="w-5 h-5 text-pink-500 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-900">Metode Pengiriman</h2>
                </div>

                <div className="space-y-3">
                  {shippingMethods.map((method) => (
                    <label key={method.id} className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="shippingMethod"
                        value={method.id}
                        checked={formData.shippingMethod === method.id}
                        onChange={handleInputChange}
                        className="text-pink-500 focus:ring-pink-500"
                      />
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="text-lg mr-2">{method.icon}</span>
                            <span className="font-medium">{method.name}</span>
                          </div>
                          <span className="font-bold text-pink-500">
                            {calculateSubtotal() > 200000 && method.id === 'regular' ? 'GRATIS' : `Rp${formatPrice(method.price)}`}
                          </span>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center mb-6">
                  <CreditCard className="w-5 h-5 text-pink-500 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-900">Metode Pembayaran</h2>
                </div>

                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <label key={method.id} className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={formData.paymentMethod === method.id}
                        onChange={handleInputChange}
                        className="text-pink-500 focus:ring-pink-500"
                      />
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="text-lg mr-2">{method.icon}</span>
                            <span className="font-medium">{method.name}</span>
                          </div>
                          {method.fee > 0 && (
                            <span className="text-sm text-gray-500">+Rp{formatPrice(method.fee)}</span>
                          )}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Ringkasan Pesanan</h2>
                
                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => {
                    const product = getProductDetails(item.productId);
                    if (!product) return null;

                    return (
                      <div key={item.id} className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-lg">{product.image}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900 line-clamp-1">{product.name}</h4>
                          <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <span className="text-sm font-medium">Rp{formatPrice(product.price * item.quantity)}</span>
                      </div>
                    );
                  })}
                </div>

                <hr className="mb-4" />

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span>Rp{formatPrice(calculateSubtotal())}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Ongkos Kirim</span>
                    <span>
                      {getShippingCost() === 0 ? (
                        <span className="text-green-600">GRATIS</span>
                      ) : (
                        `Rp${formatPrice(getShippingCost())}`
                      )}
                    </span>
                  </div>
                  
                  {getPaymentFee() > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Biaya Admin</span>
                      <span>Rp{formatPrice(getPaymentFee())}</span>
                    </div>
                  )}
                  
                  <hr />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-pink-500">Rp{formatPrice(calculateTotal())}</span>
                  </div>
                  </div>

               <button
                 type="submit"
                 className="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition-colors font-medium flex items-center justify-center space-x-2"
               >
                 <CheckCircle className="w-5 h-5" />
                 <span>Buat Pesanan</span>
               </button>

               <div className="mt-4 text-xs text-gray-500 text-center">
                 Dengan melanjutkan, Anda menyetujui syarat dan ketentuan kami
               </div>
             </div>
           </div>
         </div>
       </form>
     </div>
   </UserLayout>
 );
};

export default CheckoutPage;