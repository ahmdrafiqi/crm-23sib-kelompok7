// src/pages/HalamanUser/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { User, MapPin, Phone, Mail, Calendar, Package, Edit2, Save, X } from 'lucide-react';

import Header from '../../components/HalamanUser/Header';
import Header from '../../components/HalamanUser/Footer';



const ProfilePage = ({ onNavigate }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: ''
  });
  const [activeTab, setActiveTab] = useState('profile');

  // Sample orders data
  const sampleOrders = [
    {
      id: 'ORDER-1703001',
      userId: 1,
      items: [
        { productId: 1, productName: 'SKINTIFIC Aqua Light Sunscreen', quantity: 1, price: 74100 },
        { productId: 2, productName: 'Maybelline Liquid Lipstick', quantity: 2, price: 89000 }
      ],
      totalAmount: 252100,
      status: 'delivered',
      orderDate: '2024-01-15T10:30:00.000Z',
      deliveryDate: '2024-01-18T14:20:00.000Z',
      shippingAddress: {
        fullName: 'John Doe',
        address: 'Jl. Sudirman No. 123',
        city: 'Jakarta'
      }
    },
    {
      id: 'ORDER-1703002',
      userId: 1,
      items: [
        { productId: 3, productName: 'The Body Shop Body Lotion', quantity: 1, price: 159000 }
      ],
      totalAmount: 159000,
      status: 'shipping',
      orderDate: '2024-01-20T09:15:00.000Z',
      deliveryDate: null,
      shippingAddress: {
        fullName: 'John Doe',
        address: 'Jl. Sudirman No. 123',
        city: 'Jakarta'
      }
    },
    {
      id: 'ORDER-1703003',
      userId: 1,
      items: [
        { productId: 4, productName: 'COSRX Snail Essence', quantity: 1, price: 185000 }
      ],
      totalAmount: 185000,
      status: 'processing',
      orderDate: '2024-01-22T16:45:00.000Z',
      deliveryDate: null,
      shippingAddress: {
        fullName: 'John Doe',
        address: 'Jl. Sudirman No. 123',
        city: 'Jakarta'
      }
    }
  ];

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      const userData = JSON.parse(user);
      setCurrentUser(userData);
      setEditData({
        name: userData.name,
        email: userData.email,
        phone: userData.phone || '',
        address: userData.address || '',
        city: userData.city || '',
        postalCode: userData.postalCode || ''
      });
      
      // Load user orders (simulate from localStorage)
      const allOrders = JSON.parse(localStorage.getItem('orders') || JSON.stringify(sampleOrders));
      const userOrders = allOrders.filter(order => order.userId === userData.id);
      setOrders(userOrders);
    }
  }, []);

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel edit
      setEditData({
        name: currentUser.name,
        email: currentUser.email,
        phone: currentUser.phone || '',
        address: currentUser.address || '',
        city: currentUser.city || '',
        postalCode: currentUser.postalCode || ''
      });
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Update user data
    const updatedUser = {
      ...currentUser,
      ...editData,
      updatedAt: new Date().toISOString()
    };

    // Update in users array
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem('users', JSON.stringify(users));
    }

    // Update current user
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    setCurrentUser(updatedUser);
    setIsEditing(false);

    alert('Profil berhasil diperbarui!');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID').format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'processing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'shipping':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'processing':
        return 'Sedang Diproses';
      case 'shipping':
        return 'Sedang Dikirim';
      case 'delivered':
        return 'Selesai';
      case 'cancelled':
        return 'Dibatalkan';
      default:
        return 'Unknown';
    }
  };

  if (!currentUser) {
    return (
      <>
      <Header activeTab="profile" onNavigate={onNavigate} />
        <div className="text-center py-16">
          <div className="text-gray-400 text-6xl mb-4">🔒</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Silakan Login</h3>
          <p className="text-gray-600 mb-6">Anda perlu login untuk melihat profil</p>
          <button 
            onClick={() => onNavigate('home')}
            className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors"
          >
            Kembali ke Home
          </button>
        </div>
      <Footer />
      </>
    );
  }

  return (
    <>
    <Header activeTab="profile" onNavigate={onNavigate} />
      <div className="mb-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profil Saya</h1>
          <p className="text-gray-600">Kelola informasi profil Anda</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'profile'
                    ? 'border-pink-500 text-pink-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Informasi Profil
              </button>

            </nav>
          </div>

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Informasi Profil</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={isEditing ? handleSave : handleEditToggle}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      isEditing
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'bg-pink-500 text-white hover:bg-pink-600'
                    }`}
                  >
                    {isEditing ? <Save className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
                    <span>{isEditing ? 'Simpan' : 'Edit Profil'}</span>
                  </button>
                  {isEditing && (
                    <button
                      onClick={handleEditToggle}
                      className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      <span>Batal</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                      />
                    ) : (
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <User className="w-5 h-5 text-gray-400 mr-3" />
                        <span className="text-gray-900">{currentUser.name}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={editData.email}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                      />
                    ) : (
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <Mail className="w-5 h-5 text-gray-400 mr-3" />
                        <span className="text-gray-900">{currentUser.email}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Telepon</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={editData.phone}
                        onChange={handleInputChange}
                        placeholder="Masukkan nomor telepon"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                      />
                    ) : (
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <Phone className="w-5 h-5 text-gray-400 mr-3" />
                        <span className="text-gray-900">{currentUser.phone || 'Belum diisi'}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Address Information */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Alamat</label>
                    {isEditing ? (
                      <textarea
                        name="address"
                        value={editData.address}
                        onChange={handleInputChange}
                        rows="3"
                        placeholder="Masukkan alamat lengkap"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                      />
                    ) : (
                      <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                        <MapPin className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                        <span className="text-gray-900">{currentUser.address || 'Belum diisi'}</span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Kota</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="city"
                          value={editData.city}
                          onChange={handleInputChange}
                          placeholder="Kota"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                        />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-900">{currentUser.city || 'Belum diisi'}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Kode Pos</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="postalCode"
                          value={editData.postalCode}
                          onChange={handleInputChange}
                          placeholder="Kode Pos"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                        />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-900">{currentUser.postalCode || 'Belum diisi'}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bergabung Sejak</label>
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-gray-900">{formatDate(currentUser.createdAt || currentUser.joinDate)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}


        </div>

        {/* Statistics */}
        {activeTab === 'orders' && orders.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="text-2xl font-bold text-pink-500 mb-2">{orders.length}</div>
              <div className="text-sm text-gray-600">Total Pesanan</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="text-2xl font-bold text-green-500 mb-2">
                {orders.filter(o => o.status === 'delivered').length}
              </div>
              <div className="text-sm text-gray-600">Pesanan Selesai</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="text-2xl font-bold text-blue-500 mb-2">
                {orders.filter(o => o.status === 'shipping').length}
              </div>
              <div className="text-sm text-gray-600">Sedang Dikirim</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="text-2xl font-bold text-yellow-500 mb-2">
                {orders.filter(o => o.status === 'processing').length}
              </div>
              <div className="text-sm text-gray-600">Diproses</div>
            </div>
          </div>
        )}
      </div>
    <Footer />
    </>
  );
};

export default ProfilePage;